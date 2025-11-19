CREATE TABLE T_ST_TIPO_USUARIO(
    id_tipo_usuario INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nm_tipo_usuario VARCHAR(50) NOT NULL -- nm é para nome
);

CREATE TABLE T_ST_ESP32(
    id_esp32 INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY
);

CREATE TABLE T_ST_USUARIO(
    id_usuario INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nm_usuario VARCHAR(100) NOT NULL, -- nm é para nome
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(150) NOT NULL,
    foto BLOB,
    at_usuario CHAR(1) CHECK (at_usuario IN ('0','1')), -- at é para ativo
    id_tipo_usuario INTEGER,
    id_esp32 INTEGER,
    CONSTRAINT fk_usuario_tipo FOREIGN KEY(id_tipo_usuario)
        REFERENCES T_ST_TIPO_USUARIO(id_tipo_usuario),
    CONSTRAINT fk_usuario_esp32 FOREIGN KEY(id_esp32)
        REFERENCES T_ST_ESP32(id_esp32)
);

-- PRIMEIRO cria CATEGORIA, sem FK para trabalho
CREATE TABLE T_ST_CATEGORIA(
    id_categoria INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nm_categoria VARCHAR(150) NOT NULL,
    cd_categoria CLOB NOT NULL -- descrição da categoria
);

-- Depois TRABALHO recebendo a FK de CATEGORIA
CREATE TABLE T_ST_TRABALHO(
    id_trabalho INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nm_trabalho VARCHAR(150) NOT NULL,
    cd_trabalho CLOB NOT NULL, -- texto do trabalho
    id_categoria INTEGER NOT NULL,
    CONSTRAINT fk_trabalho_categoria FOREIGN KEY(id_categoria)
        REFERENCES T_ST_CATEGORIA(id_categoria)
);

CREATE TABLE T_ST_COMENTARIO(
    id_comentario INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cd_comentario CLOB,      -- texto do comentário                            
    at_comentario CHAR(1) CHECK (at_comentario IN ('0','1')), -- at é para ativo
    id_usuario INTEGER NOT NULL,
    id_trabalho INTEGER NOT NULL,
    CONSTRAINT fk_comentario_usuario FOREIGN KEY(id_usuario)
        REFERENCES T_ST_USUARIO(id_usuario),
    CONSTRAINT fk_comentario_trabalho FOREIGN KEY(id_trabalho)
        REFERENCES T_ST_TRABALHO(id_trabalho)
);

COMMIT;