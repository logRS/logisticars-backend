export default {
  serialize: (usuario) => {
    return {
      id: usuario.id_usuario,
      nome: usuario.nome,
      email: usuario.email,
      tipo_usuario: usuario.tipo_usuario
    };
  }
}