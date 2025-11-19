CREATE OR REPLACE PROCEDURE PR_INSERIR_CATEGORIA(
    p_nome IN VARCHAR2,
    p_conteudo IN CLOB
) AS
BEGIN
    INSERT INTO T_ST_CATEGORIA(nm_categoria, cd_categoria)
    VALUES (p_nome, p_conteudo);

    DBMS_OUTPUT.PUT_LINE('Categoria inserida: ' || p_nome);
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao inserir categoria: ' || SQLERRM);
END;
/
