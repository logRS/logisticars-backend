import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import bcrypt from 'bcryptjs';

@Entity("categorias")
export class Categoria {
  @PrimaryGeneratedColumn("uuid")
  id_categoria: string = uuidv4();

  @Column()
  nome!: string;
}

@Entity("origem")
export class Origem {
  @PrimaryGeneratedColumn("uuid")
  id_origem: string = uuidv4();

  @Column()
  nome!: string;

  @Column({ name: "cpf/cnpj" })
  cpfCnpj!: string;

  @Column()
  categoria!: string;
}
@Entity("cd")
export class Cd {
  @PrimaryGeneratedColumn("uuid")
  id_cd: string = uuidv4();

  @Column({ name: "id_admin" })
  idAdmin!: string;

  @Column()
  descrição!: string;

  @Column()
  endereço!: string;

  @Column()
  nome!: string;

  @Column({ name: "capacidade_armazenamento" })
  capacidadeArmazenamento!: string;

  @OneToMany(() => Usuario, (usuario) => usuario.cd)
  usuarios!: Usuario[];
}
@Entity("usuario")
export class Usuario {
  @PrimaryGeneratedColumn("uuid")
  id_usuario: string = uuidv4();

  @Column({ name: "tipo_usuario" })
  tipoUsuario!: string;

  @Column()
  nome!: string;

  @Column()
  email!: string;

  @Column()
  senha!: string;

  @ManyToOne(() => Cd, (cd) => cd.usuarios)
  cd: Cd = new Cd() || null;

  @Column({ nullable: false })
  salt!: string;

  setPassword(password: string) {
    this.salt = bcrypt.genSaltSync(12);
    this.senha = bcrypt.hashSync(password, this.salt);
  }

  verifyPassword(password: string) {
    const hash = bcrypt.hashSync(password, this.salt);
    return hash === this.senha;
  }
}

// @Entity('item')
// export class Item {
//     @PrimaryGeneratedColumn('uuid')
//     id_item: string = uuidv4();

//     @Column()
//   nome!: string;

//     @Column({ name: 'unidade_medida' })
//   unidadeMedida!: string;

//     @Column({ type: 'date' })
//   created_at!: Date;

//     @Column({ type: 'date' })
//   updated_at!: Date;

//     @ManyToOne(() => Categoria, categoria => categoria.items)
//   @JoinColumn({ name: 'id_categoria' })
//   categoria: Categoria = new Categoria;
// }

// @Entity('ponto_entrega')
// export class PontoEntrega {
//     @PrimaryGeneratedColumn('uuid')
//     id_ponto_entrega: string = uuidv4();

//     @Column()
//   endereço!: string;

//     @Column()
//   responsavel!: string;

//     @Column()
//   telefone!: string;

//     @Column({ type: 'date' })
//   created_at!: Date;

//     @Column({ type: 'date' })
//   updated_at!: Date;
// }

// @Entity('localizacao_estoque')
// export class LocalizacaoEstoque {
//     @PrimaryGeneratedColumn('uuid')
//     id_localizacao: string = uuidv4();

//     @Column({ name: 'id_estoque' })
//   idEstoque!: string;

//     @Column()
//   nome!: string;

//     @ManyToOne(() => Cd, cd => cd.localizacoes)
//   @JoinColumn({ name: 'id_estoque' })
//   estoque: Cd = new Cd;
// }

// @Entity('viagem')
// export class Viagem {
//     @PrimaryGeneratedColumn('uuid')
//     id_viagem: string = uuidv4();

//     @Column({ name: 'placa_transporte' })
//   placaTransporte!: string;

//     @Column()
//   motorista!: string;

//     @Column({ type: 'date' })
//   created_at!: Date;

//     @Column({ type: 'date' })
//   updated_at!: Date;
// }

// @Entity('demanda')
// export class Demanda {
//     @PrimaryGeneratedColumn('uuid')
//     id_demanda: string = uuidv4();

//     @Column({ name: 'id_coordenador' })
//   idCoordenador!: string;

//     @Column()
//   prioridade!: string;

//     @Column()
//   quantidade!: number;

//     @Column({ type: 'date' })
//   created_at!: Date;

//     @Column({ type: 'date' })
//   updated_at!: Date;

//     @ManyToOne(() => Usuario, usuario => usuario.demandas)
//   @JoinColumn({ name: 'id_coordenador' })
//   coordenador: Usuario = new Usuario;

//     @ManyToOne(() => Item, item => item.demandas)
//   @JoinColumn({ name: 'id_item' })
//   item: Item = new Item;

//     @ManyToOne(() => PontoEntrega, pontoEntrega => pontoEntrega.demandas)
//   @JoinColumn({ name: 'id_ponto_entrega' })
//   pontoEntrega: PontoEntrega = new PontoEntrega;
// }
