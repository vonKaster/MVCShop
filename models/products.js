class products {
  constructor(id, titulo, precio, categoria, descripcion, imagen) {
    this.id = id;
    this.title = titulo;
    this.precio = precio;
    this.categoria = categoria;
    this.descripcion = descripcion;
    this.imagen = imagen;
  }
  static fromJson({ id, title, price, category, description, image }) {
    return new products(id, title, price, category, description, image);
  }
}
export default products;
