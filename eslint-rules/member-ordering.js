"use strict";

const GROUP_ORDER = new Map([
  // Sygnały (input, output, viewChild, contentChild, model)
  ["public-signal-field", 0],
  ["protected-signal-field", 1],
  ["private-signal-field", 2],

  // inject()
  ["public-inject-field", 3],
  ["protected-inject-field", 4],
  ["private-inject-field", 5],

  // Pola abstrakcyjne
  ["public-abstract-field", 6],
  ["protected-abstract-field", 7],

  // Gettery / settery
  ["public-get-set", 8],
  ["protected-get-set", 9],
  ["private-get-set", 10],

  // Pola statyczne
  ["public-static-field", 11],
  ["protected-static-field", 12],
  ["private-static-field", 13],

  // Pola instancji
  ["public-instance-field", 14],
  ["protected-instance-field", 15],
  ["private-instance-field", 16],

  // Konstruktor
  ["constructor", 17],

  // Metody statyczne
  ["public-static-method", 18],
  ["protected-static-method", 19],
  ["private-static-method", 20],

  // Metody abstrakcyjne
  ["public-abstract-method", 21],
  ["protected-abstract-method", 22],

  // Metody instancji
  ["public-instance-method", 23],
  ["protected-instance-method", 24],
  ["private-instance-method", 25],
]);

const SIGNAL_FUNCTIONS = new Set([
  "input",
  "output",
  "model",
  "viewChild",
  "viewChildren",
  "contentChild",
  "contentChildren",
]);

/**
 * Zwraca nazwę funkcji wywołanej w inicjalizatorze pola, np.:
 *   foo = input.required<X>()  → "input"
 *   foo = inject(Service)      → "inject"
 *   foo = computed(() => ...)  → "computed"
 *   foo = new Foo()            → null
 */
function getInitializerCallee(node) {
  const init = node.value;
  if (!init || init.type !== "CallExpression") return null;

  if (init.callee.type === "Identifier") {
    return init.callee.name;
  }

  // foo = input.required(...)
  if (init.callee.type === "MemberExpression" && init.callee.object?.type === "Identifier") {
    return init.callee.object.name;
  }

  return null;
}

function getAccessibility(member) {
  if (member.accessibility === "protected") return "protected";
  if (member.accessibility === "private" || member.key?.type === "PrivateIdentifier") return "private";
  return "public";
}

function getMemberName(member) {
  return member.key?.name ?? member.key?.value ?? "(unknown)";
}

function getGroup(member) {
  const { type, kind, static: isStatic, abstract } = member;
  const access = getAccessibility(member);

  if (type === "MethodDefinition") {
    if (kind === "constructor") return "constructor";
    if (kind === "get" || kind === "set") return `${access}-get-set`;

    if (kind === "method") {
      if (abstract) return `${access}-abstract-method`;
      if (isStatic) return `${access}-static-method`;
      return `${access}-instance-method`;
    }
  }

  if (type === "PropertyDefinition") {
    if (abstract) return `${access}-abstract-field`;
    if (isStatic) return `${access}-static-field`;

    const callee = getInitializerCallee(member);
    if (callee && SIGNAL_FUNCTIONS.has(callee)) return `${access}-signal-field`;
    if (callee === "inject") return `${access}-inject-field`;

    return `${access}-instance-field`;
  }

  return null;
}

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce Angular member ordering (signals, inject, getters, fields, methods)",
    },
    schema: [],
    messages: {
      wrongOrder: "'{{current}}' ({{currentGroup}}) powinno być przed '{{previous}}' ({{previousGroup}})",
    },
  },
  create(context) {
    return {
      ClassBody(node) {
        let lastGroupIndex = -1;
        let lastMemberName = "";
        let lastGroup = "";

        for (const member of node.body) {
          const group = getGroup(member);
          if (!group) continue;

          const groupIndex = GROUP_ORDER.get(group);
          if (groupIndex === undefined) continue; // nieznana grupa → pomiń

          const memberName = getMemberName(member);

          if (groupIndex < lastGroupIndex) {
            context.report({
              node: member,
              messageId: "wrongOrder",
              data: {
                current: memberName,
                currentGroup: group,
                previous: lastMemberName,
                previousGroup: lastGroup,
              },
            });
          } else {
            lastGroupIndex = groupIndex;
            lastMemberName = memberName;
            lastGroup = group;
          }
        }
      },
    };
  },
};
