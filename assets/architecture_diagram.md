graph LR
    subgraph SHELL["App Shell"]
        RT["Router\nLazy loading"]
        GD["Guards\nAuthentication"]
        CR["Core\nLayout · Enums"]
    end
    subgraph FEAT["Feature Page (wzorzec)"]
        PG["Page Component\nOrchestration"]
        AP["API Layer\nServices · DTOs"]
        FM["Reactive Forms\nForm Groups · Validators"]
        FC["Factories\nForm · Request mappers"]
        CP["Components\nPresentation"]
    end
    IX["HTTP Interceptor\nJWT · Error handling"]
    API[["⚙️ Quizi.API (REST)"]]

    RT -->|chroni trasy| GD
    GD --> CR
    RT -->|lazy loads| FEAT
    PG --> AP
    PG --> FM
    PG --> FC
    PG -->|dane| CP
    AP --> IX
    IX -->|HttpClient| API