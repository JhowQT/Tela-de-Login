CREATE OR REPLACE PROCEDURE PR_INSERIR_TRABALHO(
    p_nome IN VARCHAR2,
    p_conteudo IN CLOB,
    p_id_categoria IN NUMBER
) AS
    v_categoria_exist NUMBER;
    v_trabalho_exist NUMBER;
BEGIN
    -- Verifica se a categoria existe
    SELECT COUNT(*) INTO v_categoria_exist
    FROM T_ST_CATEGORIA
    WHERE id_categoria = p_id_categoria;

    IF v_categoria_exist = 0 THEN
        RAISE_APPLICATION_ERROR(-20010, 'Categoria inexistente.');
    END IF;

    -- Verifica se já existe um trabalho com o mesmo nome
    SELECT COUNT(*) INTO v_trabalho_exist
    FROM T_ST_TRABALHO
    WHERE nm_trabalho = p_nome;

    IF v_trabalho_exist > 0 THEN
        RAISE_APPLICATION_ERROR(-20011, 'Já existe um trabalho com esse nome.');
    END IF;

   
    v_trabalho_exist := FN_VALIDAR_TRABALHO(-1);  -- ID inexistente proposital

    -- Insere o novo trabalho
    INSERT INTO T_ST_TRABALHO(nm_trabalho, cd_trabalho, id_categoria)
    VALUES (p_nome, p_conteudo, p_id_categoria);

    DBMS_OUTPUT.PUT_LINE('Trabalho inserido: ' || p_nome);

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Erro ao inserir trabalho: ' || SQLERRM);
END;
/
