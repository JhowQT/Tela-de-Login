INSERT INTO T_ST_ESP32 (id_esp32) VALUES (DEFAULT);


INSERT INTO T_ST_TIPO_USUARIO (nm_tipo_usuario) VALUES ('ADMIN');
INSERT INTO T_ST_TIPO_USUARIO (nm_tipo_usuario) VALUES ('USER');


INSERT INTO T_ST_CATEGORIA (nm_categoria, cd_categoria)
VALUES ('Introdução', 'Categoria introdutória para trabalhos de análise.');
INSERT INTO T_ST_CATEGORIA (nm_categoria, cd_categoria)
VALUES ('Metodologia', 'Categoria destinada a métodos aplicados nos projetos.');
INSERT INTO T_ST_CATEGORIA (nm_categoria, cd_categoria)
VALUES ('Resultados', 'Categoria para apresentação dos principais resultados.');


-- Categoria 1
INSERT INTO T_ST_TRABALHO (nm_trabalho, cd_trabalho, id_categoria)
VALUES ('Sistema de Clima', 'Análise de dados de sensores climáticos.', 1);
INSERT INTO T_ST_TRABALHO (nm_trabalho, cd_trabalho, id_categoria)
VALUES ('Monitoramento Atmosférico', 'Sistema de detecção e monitoramento da atmosfera.', 1);
INSERT INTO T_ST_TRABALHO (nm_trabalho, cd_trabalho, id_categoria)
VALUES ('Previsão de Tempo', 'Modelo preditivo baseado em dados históricos.', 1);


-- Categoria 2
INSERT INTO T_ST_TRABALHO (nm_trabalho, cd_trabalho, id_categoria)
VALUES ('Automação Residencial', 'Controle inteligente de iluminação e sensores.', 2);
INSERT INTO T_ST_TRABALHO (nm_trabalho, cd_trabalho, id_categoria)
VALUES ('Sistema de Segurança', 'Detecção de movimentos e disparo de alertas.', 2);
INSERT INTO T_ST_TRABALHO (nm_trabalho, cd_trabalho, id_categoria)
VALUES ('Monitoramento de Solo', 'Avaliação contínua da umidade e nutrientes do solo.', 2);


-- Categoria 3
INSERT INTO T_ST_TRABALHO (nm_trabalho, cd_trabalho, id_categoria)
VALUES ('Análise de Ruído Urbano', 'Coleta e análise acústica em regiões urbanas.', 3);
INSERT INTO T_ST_TRABALHO (nm_trabalho, cd_trabalho, id_categoria)
VALUES ('Mapeamento de Calor', 'Identificação visual de calor em regiões densas.', 3);
INSERT INTO T_ST_TRABALHO (nm_trabalho, cd_trabalho, id_categoria)
VALUES ('Avaliação de Consumo Energético', 'Medição e análise do uso elétrico doméstico.', 3);


INSERT INTO T_ST_USUARIO 
(nm_usuario, email, senha, foto, at_usuario, id_tipo_usuario, id_esp32)
VALUES ('Administrador 1', 'admin1@startrek.com', 'senha123', NULL, '1', 1, 1);
INSERT INTO T_ST_USUARIO 
(nm_usuario, email, senha, foto, at_usuario, id_tipo_usuario, id_esp32)
VALUES ('Administrador 2', 'admin2@startrek.com', 'senha123', NULL, '1', 1, 1);


INSERT INTO T_ST_USUARIO 
(nm_usuario, email, senha, foto, at_usuario, id_tipo_usuario, id_esp32)
VALUES ('Usuário 1', 'user1@startrek.com', 'senha123', NULL, '1', 2, 1);
INSERT INTO T_ST_USUARIO 
(nm_usuario, email, senha, foto, at_usuario, id_tipo_usuario, id_esp32)
VALUES ('Usuário 2', 'user2@startrek.com', 'senha123', NULL, '1', 2, 1);
INSERT INTO T_ST_USUARIO 
(nm_usuario, email, senha, foto, at_usuario, id_tipo_usuario, id_esp32)
VALUES ('Usuário 3', 'user3@startrek.com', 'senha123', NULL, '1', 2, 1);
INSERT INTO T_ST_USUARIO 
(nm_usuario, email, senha, foto, at_usuario, id_tipo_usuario, id_esp32)
VALUES ('Usuário 4', 'user4@startrek.com', 'senha123', NULL, '1', 2, 1);
INSERT INTO T_ST_USUARIO 
(nm_usuario, email, senha, foto, at_usuario, id_tipo_usuario, id_esp32)
VALUES ('Usuário 5', 'user5@startrek.com', 'senha123', NULL, '1', 2, 1);
INSERT INTO T_ST_USUARIO 
(nm_usuario, email, senha, foto, at_usuario, id_tipo_usuario, id_esp32)
VALUES ('Usuário 6', 'user6@startrek.com', 'senha123', NULL, '1', 2, 1);
INSERT INTO T_ST_USUARIO 
(nm_usuario, email, senha, foto, at_usuario, id_tipo_usuario, id_esp32)
VALUES ('Usuário 7', 'user7@startrek.com', 'senha123', NULL, '1', 2, 1);
INSERT INTO T_ST_USUARIO 
(nm_usuario, email, senha, foto, at_usuario, id_tipo_usuario, id_esp32)
VALUES ('Usuário 8', 'user8@startrek.com', 'senha123', NULL, '1', 2, 1);
INSERT INTO T_ST_USUARIO 
(nm_usuario, email, senha, foto, at_usuario, id_tipo_usuario, id_esp32)
VALUES ('Usuário 9', 'user9@startrek.com', 'senha123', NULL, '1', 2, 1);


INSERT INTO T_ST_COMENTARIO 
(cd_comentario, at_comentario, id_usuario, id_trabalho)
VALUES ('Ótimo projeto!', '1', 3, 1);
INSERT INTO T_ST_COMENTARIO 
(cd_comentario, at_comentario, id_usuario, id_trabalho)
VALUES ('Muito interessante!', '1', 4, 2);
INSERT INTO T_ST_COMENTARIO 
(cd_comentario, at_comentario, id_usuario, id_trabalho)
VALUES ('Amei esse sistema!', '1', 5, 3);
INSERT INTO T_ST_COMENTARIO 
(cd_comentario, at_comentario, id_usuario, id_trabalho)
VALUES ('Muito bem explicado!', '1', 6, 4);
INSERT INTO T_ST_COMENTARIO 
(cd_comentario, at_comentario, id_usuario, id_trabalho)
VALUES ('Execução impecável!', '1', 7, 5);
INSERT INTO T_ST_COMENTARIO 
(cd_comentario, at_comentario, id_usuario, id_trabalho)
VALUES ('Gostei demais!', '1', 8, 6);
INSERT INTO T_ST_COMENTARIO 
(cd_comentario, at_comentario, id_usuario, id_trabalho)
VALUES ('Excelente análise!', '1', 9, 7);
INSERT INTO T_ST_COMENTARIO 
(cd_comentario, at_comentario, id_usuario, id_trabalho)
VALUES ('Muito detalhado!', '1', 10, 8);
INSERT INTO T_ST_COMENTARIO 
(cd_comentario, at_comentario, id_usuario, id_trabalho)
VALUES ('Trabalho incrível!', '1', 11, 9);


commit;

select * from t_st_comentario;