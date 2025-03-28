class PostsService {
    _apiBase = ' https://jsonplaceholder.typicode.com';
    _baseOffset = 10;
    
    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async () => {
       const res = await this.getResource(`${this._apiBase}/posts`);  
       return res;    
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/posts/${id}`);
     return res;
    }

    getCharacterComments = async (id) => {
        const res = await this.getResource(`${this._apiBase}/posts/${id}/comments`);
     //   return this._transformCharacter(res.data.results[0]);
     return res;
    }

    getAllComments = async () => {
        const res = await this.getResource(`${this._apiBase}/comments`);
     //   return this._transformCharacter(res.data.results[0]);
     return res;
    }


    getUser = async (id) => {
        const res = await this.getResource(`${this._apiBase}/users/${id}`);
     return res;
    }

    getAllUsers = async () => {
        const res = await this.getResource(`${this._apiBase}/users`);
     return res;
    }

}

export default PostsService;