module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Require readonly modifier on signal inputs",
    },
    fixable: "code",
    messages: {
      missingReadonly: 'Signal input "{{name}}" must be readonly.',
    },
  },
  create(context) {
    return {
      PropertyDefinition(node) {
        const isInput =
          node.value?.type === "CallExpression" &&
          (node.value.callee?.name === "input" || node.value.callee?.object?.name === "input");

        if (isInput && !node.readonly) {
          context.report({
            node,
            messageId: "missingReadonly",
            data: { name: node.key.name },
            fix(fixer) {
              const sourceCode = context.getSourceCode();
              const tokens = sourceCode.getTokens(node);
              const publicToken = tokens.find(
                (t) => t.value === "public" || t.value === "protected" || t.value === "private",
              );

              if (publicToken) {
                return fixer.insertTextAfter(publicToken, " readonly");
              }

              return fixer.insertTextBefore(node, "readonly ");
            },
          });
        }
      },
    };
  },
};
