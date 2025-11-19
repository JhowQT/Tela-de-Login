CREATE OR REPLACE FUNCTION FN_USUARIO_ATIVO(
    p_id_usuario IN NUMBER
) RETURN NUMBER AS
    v_status CHAR(1);
BEGIN
    SELECT at_usuario INTO v_status
    FROM T_ST_USUARIO
    WHERE id_usuario = p_id_usuario;

    IF v_status = '1' THEN
        RETURN 1;
    ELSE
        RETURN 0;
    END IF;
END;
/
