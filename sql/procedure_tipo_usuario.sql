CREATE OR REPLACE PROCEDURE PR_INSERIR_TIPO_USUARIO(
    p_nome IN VARCHAR2
) AS
BEGIN
    INSERT INTO T_ST_TIPO_USUARIO (nm_tipo_usuario)
    VALUES (p_nome);

    DBMS_OUTPUT.PUT_LINE('Tipo de usuário inserido: ' || p_nome);
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao inserir tipo usuário: ' || SQLERRM);
END;
/
