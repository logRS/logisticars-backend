import { MigrationInterface, QueryRunner } from "typeorm";

export class Sh1715407971803 implements MigrationInterface {
    name = 'Sh1715407971803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`-- Criação das tabelas
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        
        -- Tabela: categorias
        CREATE TABLE categorias (
            id_categoria UUID DEFAULT gen_random_uuid () PRIMARY KEY,
            nome VARCHAR(255)
        );
        
        -- Tabela: origem
        CREATE TABLE origem (
            id_origem UUID DEFAULT gen_random_uuid () PRIMARY KEY,
            nome VARCHAR(255),
            "cpf/cnpj" VARCHAR(255),
            categoria VARCHAR(255)
        );
        -- Tabela: usuario
        CREATE TABLE usuario (
            id_usuario UUID DEFAULT gen_random_uuid () PRIMARY KEY,
            tipo_usuario VARCHAR(255),
            nome VARCHAR(255),
            email VARCHAR(255),
            senha VARCHAR(255),
            id_cd UUID
        );
        
        -- Tabela: cd
        CREATE TABLE cd (
            id_cd UUID DEFAULT gen_random_uuid () PRIMARY KEY,
            id_admin UUID,
            descrição VARCHAR(255),
            endereço VARCHAR(255),
            nome VARCHAR(255),
            capacidade_armazenamento VARCHAR(255),
            FOREIGN KEY (id_admin) REFERENCES usuario (id_usuario)
        );
        
        -- Fk: usuario <> CD
        ALTER TABLE usuario
        ADD FOREIGN KEY (id_cd) REFERENCES cd (id_cd);
        
        
        -- Tabela: item
        CREATE TABLE item (
            id_item UUID DEFAULT gen_random_uuid () PRIMARY KEY,
            nome VARCHAR(255),
            unidade_medida VARCHAR(255),
            created_at DATE,
            updated_at DATE,
            id_categoria UUID,
            FOREIGN KEY (id_categoria) REFERENCES categorias (id_categoria)
        );
        
        -- Tabela: ponto_entrega
        CREATE TABLE ponto_entrega (
            id_ponto_entrega UUID DEFAULT gen_random_uuid () PRIMARY KEY,
            endereço VARCHAR(255),
            responsavel VARCHAR(255),
            telefone VARCHAR(255),
            created_at DATE,
            updated_at DATE
        );
        
        -- Tabela: localizacao_estoque
        CREATE TABLE localizacao_estoque (
            id_localizacao UUID DEFAULT gen_random_uuid () PRIMARY KEY,
            id_estoque UUID,
            nome VARCHAR(255),
            FOREIGN KEY (id_estoque) REFERENCES cd (id_cd)
        );
         
        -- Tabela: viagem
        CREATE TABLE viagem (
            id_viagem UUID DEFAULT gen_random_uuid () PRIMARY KEY,
            placa_transporte VARCHAR(255),
            motorista VARCHAR(255),
            created_at DATE,
            updated_at DATE
        );
        
        -- Tabela: demanda
        CREATE TABLE demanda (
            id_demanda UUID DEFAULT gen_random_uuid () PRIMARY KEY,
            id_coordenador UUID,
            prioridade VARCHAR(255),
            id_item UUID,
            quantidade INT,
            id_ponto_entrega UUID,
            created_at DATE,
            updated_at DATE,
            FOREIGN KEY (id_coordenador) REFERENCES usuario (id_usuario),
            FOREIGN KEY (id_item) REFERENCES item (id_item),
            FOREIGN KEY (id_ponto_entrega) REFERENCES ponto_entrega (id_ponto_entrega)
        );
        
        -- Tabela: item_estoque
        CREATE TABLE item_estoque (
            id_item_estoque UUID DEFAULT gen_random_uuid () PRIMARY KEY,
            id_item UUID,
            tipo_operacao VARCHAR(255),
            id_localizacao UUID,
            quantidade INT,
            id_estoque UUID,
            validade TIME,
            id_origem UUID,
            FOREIGN KEY (id_item) REFERENCES item (id_item),
            FOREIGN KEY (id_estoque) REFERENCES cd (id_cd),
            FOREIGN KEY (id_origem) REFERENCES origem (id_origem),
            FOREIGN KEY (id_localizacao) REFERENCES localizacao_estoque (id_localizacao)
        );
        
        
        -- Tabela: entrega_demanda
        CREATE TABLE entrega_demanda (
            id_entrega UUID DEFAULT gen_random_uuid () PRIMARY KEY,
            id_viagem UUID,
            id_demanda UUID,
            id_gestor UUID,
            status VARCHAR(255),
            observação VARCHAR(255),
            created_at DATE,
            updated_at DATE,
            FOREIGN KEY (id_viagem) REFERENCES viagem (id_viagem),
            FOREIGN KEY (id_demanda) REFERENCES demanda (id_demanda),
            FOREIGN KEY (id_gestor) REFERENCES usuario (id_usuario)
        );
        
        -- Tabela: pacote
        CREATE TABLE pacote (
            id_pacote UUID DEFAULT gen_random_uuid () PRIMARY KEY,
            id_viagem UUID,
            id_ponto_entrega UUID,
            codigo VARCHAR(255),
            FOREIGN KEY (id_viagem) REFERENCES viagem (id_viagem),
            FOREIGN KEY (id_ponto_entrega) REFERENCES ponto_entrega (id_ponto_entrega)
        );
        
        -- Tabela: ordem_de_compra
        CREATE TABLE ordem_de_compra (
            id_ordem_de_compra UUID DEFAULT gen_random_uuid () PRIMARY KEY,
            id_demanda UUID,
            id_item UUID,
            nome VARCHAR(255),
            status VARCHAR(255),
            created_at DATE,
            updated_at DATE,
            FOREIGN KEY (id_demanda) REFERENCES demanda (id_demanda),
            FOREIGN KEY (id_item) REFERENCES item (id_item)
        );
        
        -- Tabela: ordem_de_transferencia
        CREATE TABLE ordem_de_transferencia (
            id_ordem_de_transferencia UUID DEFAULT gen_random_uuid () PRIMARY KEY,
            id_demanda UUID,
            id_demanda_de_transferencia UUID,
            cd_origem UUID,
            cd_destino UUID,
            status VARCHAR(255),
            created_at DATE,
            updated_at DATE,
            FOREIGN KEY (id_demanda) REFERENCES demanda (id_demanda),
            FOREIGN KEY (id_demanda_de_transferencia) REFERENCES demanda (id_demanda),
            FOREIGN KEY (cd_origem) REFERENCES cd (id_cd),
            FOREIGN KEY (cd_destino) REFERENCES cd (id_cd)
        );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
