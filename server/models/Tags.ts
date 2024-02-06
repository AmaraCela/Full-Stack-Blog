class Tag{
    private user_id:number;
    private post_id:number;

    constructor(user_id:number, post_id:number)
    {
        this.user_id = user_id;
        this.post_id = post_id;
    }

    getUserId():number{
        return this.user_id;
    }
    
    getPostId():number{
        return this.post_id;
    }
}

export default Tag;