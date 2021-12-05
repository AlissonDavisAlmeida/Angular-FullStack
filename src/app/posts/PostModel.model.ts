export class PostModel {
    #titulo : string;

    _id : string;

    #conteudo : string;

    constructor(titulo, conteudo) {
      this.#titulo = titulo;
      this.#conteudo = conteudo;
    }

    get titulo() {
      return this.#titulo;
    }

    get conteudo() {
      return this.#conteudo;
    }

    set titulo(titulo : string) {
      this.#titulo = titulo;
    }

    set conteudo(conteudo : string) {
      this.#conteudo = conteudo;
    }
}
