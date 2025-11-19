CREATE OR REPLACE FUNCTION FN_VALIDAR_TRABALHO(
    p_id_trabalho IN NUMBER
) RETURN NUMBER AS
    v_count NUMBER;
BEGIN
    SELECT COUNT(*) INTO v_count
    FROM T_ST_TRABALHO
    WHERE id_trabalho = p_id_trabalho;

    RETURN v_count;
END;
/
