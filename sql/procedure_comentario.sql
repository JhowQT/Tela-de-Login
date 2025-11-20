CREATE OR REPLACE PROCEDURE PR_INSERIR_COMENTARIO(
    p_conteudo IN CLOB,
    p_email IN VARCHAR2,
    p_id_trabalho IN NUMBER
) AS
    v_email_valid NUMBER;
    v_user_id NUMBER;
    v_trabalho_exist NUMBER;
BEGIN
    -- Valida se o email existe usando FN_VALIDAR_EMAIL
    v_email_valid := FN_VALIDAR_EMAIL(p_email);

    IF v_email_valid = 0 THEN
        RAISE_APPLICATION_ERROR(-20020, 'Email informado não está cadastrado.');
    END IF;

    -- Obtém o ID do usuário correspondente ao email
    SELECT id_usuario INTO v_user_id
    FROM T_ST_USUARIO
    WHERE email = p_email;

    -- Valida se o trabalho existe usando FN_VALIDAR_TRABALHO
    v_trabalho_exist := FN_VALIDAR_TRABALHO(p_id_trabalho);

    IF v_trabalho_exist = 0 THEN
        RAISE_APPLICATION_ERROR(-20021, 'O trabalho informado não existe.');
    END IF;

    -- Inserção do comentário
    INSERT INTO T_ST_COMENTARIO(
        cd_comentario, at_comentario, id_usuario, id_trabalho
    )
    VALUES (
        p_conteudo, '1', v_user_id, p_id_trabalho
    );

    DBMS_OUTPUT.PUT_LINE('Comentário inserido por: ' || p_email);

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao inserir comentário: ' || SQLERRM);
END;
/
