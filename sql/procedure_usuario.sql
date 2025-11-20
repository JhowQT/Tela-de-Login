CREATE OR REPLACE PROCEDURE PR_INSERIR_USUARIO(
    p_nome IN VARCHAR2,
    p_email IN VARCHAR2,
    p_senha IN VARCHAR2,
    p_id_tipo IN NUMBER,
    p_id_esp32 IN NUMBER
) AS
    v_email_exist NUMBER;
    v_tipo_exist NUMBER;
    v_esp32_exist NUMBER;
BEGIN
    -- Verifica se email já existe
    SELECT COUNT(*) INTO v_email_exist
    FROM T_ST_USUARIO
    WHERE email = p_email;

    IF v_email_exist > 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Email já cadastrado.');
    END IF;

    -- Verifica se tipo de usuário existe
    SELECT COUNT(*) INTO v_tipo_exist
    FROM T_ST_TIPO_USUARIO
    WHERE id_tipo_usuario = p_id_tipo;

    IF v_tipo_exist = 0 THEN
        RAISE_APPLICATION_ERROR(-20002, 'Tipo de usuário inexistente.');
    END IF;

    -- Verifica se ESP32 existe
    SELECT COUNT(*) INTO v_esp32_exist
    FROM T_ST_ESP32
    WHERE id_esp32 = p_id_esp32;

    IF v_esp32_exist = 0 THEN
        RAISE_APPLICATION_ERROR(-20003, 'ESP32 inexistente.');
    END IF;

    -- Insere o usuário (sempre como ativo)
    INSERT INTO T_ST_USUARIO(
        nm_usuario, email, senha, at_usuario, id_tipo_usuario, id_esp32
    ) VALUES(
        p_nome, p_email, p_senha, '1', p_id_tipo, p_id_esp32
    );

    DBMS_OUTPUT.PUT_LINE('Usuário inserido com sucesso: ' || p_nome);

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao inserir usuário: ' || SQLERRM);
END;
/
