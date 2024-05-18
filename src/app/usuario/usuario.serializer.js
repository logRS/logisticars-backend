export default {
  serialize: (usuario) => ({
    id: usuario.id_usuario,
    nome: usuario.nome,
    email: usuario.email,
    tipo_usuario: usuario.tipo_usuario,
  }),
  serializeMany: (usuarios) =>
    usuarios.map((usuario) => ({
      id: usuario.id_usuario,
      nome: usuario.nome,
      email: usuario.email,
      tipo_usuario: usuario.tipo_usuario,
    })),
};
