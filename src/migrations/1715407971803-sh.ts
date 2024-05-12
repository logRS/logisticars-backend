import { MigrationInterface, QueryRunner } from "typeorm";

export class Sh1715407971803 implements MigrationInterface {
    name = 'Sh1715407971803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`-- Criação das tabelas
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        
        -- Drop table

-- DROP TABLE public.categorias;

CREATE TABLE public.categorias (
	id_categoria uuid DEFAULT gen_random_uuid() NOT NULL,
	nome varchar(255) NULL,
	CONSTRAINT categorias_pkey PRIMARY KEY (id_categoria)
);

-- public.origem definition

-- Drop table

-- DROP TABLE public.origem;

CREATE TABLE public.origem (
	id_origem uuid DEFAULT gen_random_uuid() NOT NULL,
	nome varchar(255) NULL,
	"cpf/cnpj" varchar(255) NULL,
	categoria varchar(255) NULL,
	CONSTRAINT origem_pkey PRIMARY KEY (id_origem)
);

-- public.ponto_entrega definition

-- Drop table

-- DROP TABLE public.ponto_entrega;

CREATE TABLE public.ponto_entrega (
	id_ponto_entrega uuid DEFAULT gen_random_uuid() NOT NULL,
	endereço varchar(255) NULL,
	responsavel varchar(255) NULL,
	telefone varchar(255) NULL,
	created_at date NULL,
	updated_at date NULL,
	CONSTRAINT ponto_entrega_pkey PRIMARY KEY (id_ponto_entrega)
);


-- public.viagem definition

-- Drop table

-- DROP TABLE public.viagem;

CREATE TABLE public.viagem (
	id_viagem uuid DEFAULT gen_random_uuid() NOT NULL,
	placa_transporte varchar(255) NULL,
	motorista varchar(255) NULL,
	created_at date NULL,
	updated_at date NULL,
	CONSTRAINT viagem_pkey PRIMARY KEY (id_viagem)
);


-- public.item definition

-- Drop table

-- DROP TABLE public.item;

CREATE TABLE public.item (
	id_item uuid DEFAULT gen_random_uuid() NOT NULL,
	nome varchar(255) NULL,
	unidade_medida varchar(255) NULL,
	created_at date NULL,
	updated_at date NULL,
	id_categoria uuid NULL,
	CONSTRAINT item_pkey PRIMARY KEY (id_item),
	CONSTRAINT item_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categorias(id_categoria)
);


-- public.pacote definition

-- Drop table

-- DROP TABLE public.pacote;

CREATE TABLE public.pacote (
	id_pacote uuid DEFAULT gen_random_uuid() NOT NULL,
	id_viagem uuid NULL,
	id_ponto_entrega uuid NULL,
	codigo varchar(255) NULL,
	CONSTRAINT pacote_pkey PRIMARY KEY (id_pacote),
	CONSTRAINT pacote_id_ponto_entrega_fkey FOREIGN KEY (id_ponto_entrega) REFERENCES public.ponto_entrega(id_ponto_entrega),
	CONSTRAINT pacote_id_viagem_fkey FOREIGN KEY (id_viagem) REFERENCES public.viagem(id_viagem)
);


-- public.cd definition

-- Drop table

-- DROP TABLE public.cd;

CREATE TABLE public.cd (
	id_cd uuid DEFAULT gen_random_uuid() NOT NULL,
	id_admin uuid NULL,
	descrição varchar(255) NULL,
	endereço varchar(255) NULL,
	nome varchar(255) NULL,
	capacidade_armazenamento varchar(255) NULL,
	CONSTRAINT cd_pkey PRIMARY KEY (id_cd)
);


-- public.demanda definition

-- Drop table

-- DROP TABLE public.demanda;

CREATE TABLE public.demanda (
	id_demanda uuid DEFAULT gen_random_uuid() NOT NULL,
	id_coordenador uuid NULL,
	prioridade varchar(255) NULL,
	id_item uuid NULL,
	quantidade int4 NULL,
	id_ponto_entrega uuid NULL,
	created_at date NULL,
	updated_at date NULL,
	CONSTRAINT demanda_pkey PRIMARY KEY (id_demanda)
);


-- public.entrega_demanda definition

-- Drop table

-- DROP TABLE public.entrega_demanda;

CREATE TABLE public.entrega_demanda (
	id_entrega uuid DEFAULT gen_random_uuid() NOT NULL,
	id_viagem uuid NULL,
	id_demanda uuid NULL,
	id_gestor uuid NULL,
	status varchar(255) NULL,
	observação varchar(255) NULL,
	created_at date NULL,
	updated_at date NULL,
	CONSTRAINT entrega_demanda_pkey PRIMARY KEY (id_entrega)
);


-- public.item_estoque definition

-- Drop table

-- DROP TABLE public.item_estoque;

CREATE TABLE public.item_estoque (
	id_item_estoque uuid DEFAULT gen_random_uuid() NOT NULL,
	id_item uuid NULL,
	tipo_operacao varchar(255) NULL,
	id_localizacao uuid NULL,
	quantidade int4 NULL,
	id_estoque uuid NULL,
	validade time NULL,
	id_origem uuid NULL,
	CONSTRAINT item_estoque_pkey PRIMARY KEY (id_item_estoque)
);


-- public.localizacao_estoque definition

-- Drop table

-- DROP TABLE public.localizacao_estoque;

CREATE TABLE public.localizacao_estoque (
	id_localizacao uuid DEFAULT gen_random_uuid() NOT NULL,
	id_estoque uuid NULL,
	nome varchar(255) NULL,
	CONSTRAINT localizacao_estoque_pkey PRIMARY KEY (id_localizacao)
);


-- public.ordem_de_compra definition

-- Drop table

-- DROP TABLE public.ordem_de_compra;

CREATE TABLE public.ordem_de_compra (
	id_ordem_de_compra uuid DEFAULT gen_random_uuid() NOT NULL,
	id_demanda uuid NULL,
	id_item uuid NULL,
	nome varchar(255) NULL,
	status varchar(255) NULL,
	created_at date NULL,
	updated_at date NULL,
	CONSTRAINT ordem_de_compra_pkey PRIMARY KEY (id_ordem_de_compra)
);


-- public.ordem_de_transferencia definition

-- Drop table

-- DROP TABLE public.ordem_de_transferencia;

CREATE TABLE public.ordem_de_transferencia (
	id_ordem_de_transferencia uuid DEFAULT gen_random_uuid() NOT NULL,
	id_demanda uuid NULL,
	id_demanda_de_transferencia uuid NULL,
	cd_origem uuid NULL,
	cd_destino uuid NULL,
	status varchar(255) NULL,
	created_at date NULL,
	updated_at date NULL,
	CONSTRAINT ordem_de_transferencia_pkey PRIMARY KEY (id_ordem_de_transferencia)
);


-- public.usuario definition

-- Drop table

-- DROP TABLE public.usuario;

CREATE TABLE public.usuario (
	id_usuario uuid DEFAULT gen_random_uuid() NOT NULL,
	tipo_usuario varchar(255) NULL,
	nome varchar(255) NULL,
	email varchar(255) NULL,
	senha varchar(255) NULL,
	id_cd uuid NULL,
	salt varchar NULL,
	CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario)
);


-- public.usuario_cd definition

-- Drop table

-- DROP TABLE public.usuario_cd;

CREATE TABLE public.usuario_cd (
	id_usuario uuid NULL,
	id_cd uuid NULL
);


-- public.cd foreign keys

ALTER TABLE public.cd ADD CONSTRAINT cd_id_admin_fkey FOREIGN KEY (id_admin) REFERENCES public.usuario(id_usuario);


-- public.demanda foreign keys

ALTER TABLE public.demanda ADD CONSTRAINT demanda_id_coordenador_fkey FOREIGN KEY (id_coordenador) REFERENCES public.usuario(id_usuario);
ALTER TABLE public.demanda ADD CONSTRAINT demanda_id_item_fkey FOREIGN KEY (id_item) REFERENCES public.item(id_item);
ALTER TABLE public.demanda ADD CONSTRAINT demanda_id_ponto_entrega_fkey FOREIGN KEY (id_ponto_entrega) REFERENCES public.ponto_entrega(id_ponto_entrega);


-- public.entrega_demanda foreign keys

ALTER TABLE public.entrega_demanda ADD CONSTRAINT entrega_demanda_id_demanda_fkey FOREIGN KEY (id_demanda) REFERENCES public.demanda(id_demanda);
ALTER TABLE public.entrega_demanda ADD CONSTRAINT entrega_demanda_id_gestor_fkey FOREIGN KEY (id_gestor) REFERENCES public.usuario(id_usuario);
ALTER TABLE public.entrega_demanda ADD CONSTRAINT entrega_demanda_id_viagem_fkey FOREIGN KEY (id_viagem) REFERENCES public.viagem(id_viagem);


-- public.item_estoque foreign keys

ALTER TABLE public.item_estoque ADD CONSTRAINT item_estoque_id_estoque_fkey FOREIGN KEY (id_estoque) REFERENCES public.cd(id_cd);
ALTER TABLE public.item_estoque ADD CONSTRAINT item_estoque_id_item_fkey FOREIGN KEY (id_item) REFERENCES public.item(id_item);
ALTER TABLE public.item_estoque ADD CONSTRAINT item_estoque_id_localizacao_fkey FOREIGN KEY (id_localizacao) REFERENCES public.localizacao_estoque(id_localizacao);
ALTER TABLE public.item_estoque ADD CONSTRAINT item_estoque_id_origem_fkey FOREIGN KEY (id_origem) REFERENCES public.origem(id_origem);


-- public.localizacao_estoque foreign keys

ALTER TABLE public.localizacao_estoque ADD CONSTRAINT localizacao_estoque_id_estoque_fkey FOREIGN KEY (id_estoque) REFERENCES public.cd(id_cd);


-- public.ordem_de_compra foreign keys

ALTER TABLE public.ordem_de_compra ADD CONSTRAINT ordem_de_compra_id_demanda_fkey FOREIGN KEY (id_demanda) REFERENCES public.demanda(id_demanda);
ALTER TABLE public.ordem_de_compra ADD CONSTRAINT ordem_de_compra_id_item_fkey FOREIGN KEY (id_item) REFERENCES public.item(id_item);


-- public.ordem_de_transferencia foreign keys

ALTER TABLE public.ordem_de_transferencia ADD CONSTRAINT ordem_de_transferencia_cd_destino_fkey FOREIGN KEY (cd_destino) REFERENCES public.cd(id_cd);
ALTER TABLE public.ordem_de_transferencia ADD CONSTRAINT ordem_de_transferencia_cd_origem_fkey FOREIGN KEY (cd_origem) REFERENCES public.cd(id_cd);
ALTER TABLE public.ordem_de_transferencia ADD CONSTRAINT ordem_de_transferencia_id_demanda_de_transferencia_fkey FOREIGN KEY (id_demanda_de_transferencia) REFERENCES public.demanda(id_demanda);
ALTER TABLE public.ordem_de_transferencia ADD CONSTRAINT ordem_de_transferencia_id_demanda_fkey FOREIGN KEY (id_demanda) REFERENCES public.demanda(id_demanda);


-- public.usuario foreign keys

ALTER TABLE public.usuario ADD CONSTRAINT usuario_id_cd_fkey FOREIGN KEY (id_cd) REFERENCES public.cd(id_cd);


-- public.usuario_cd foreign keys

ALTER TABLE public.usuario_cd ADD CONSTRAINT usuario_cd_cd_fk FOREIGN KEY (id_cd) REFERENCES public.cd(id_cd) ON DELETE SET NULL;
ALTER TABLE public.usuario_cd ADD CONSTRAINT usuario_cd_usuario_fk FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON DELETE SET NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
