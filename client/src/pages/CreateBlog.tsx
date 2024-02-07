import "../styles/createBlog.css";
const CreateBlog = () => {
    return ( 
        <div>
            <form className="grid blog-form">
                <label htmlFor="title">Title for new blog:</label>
                <input type="text" id="title" />
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" cols={30} rows={10}></textarea>
                <label htmlFor="tags-dropdown">Select tags</label>
                <select name="tag" id="tags-dropdown" multiple>
                    <option value="tag1">tag1</option>
                    <option value="tag2">tag2</option>
                </select>
                <input type="file" multiple/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
     );
}
 
export default CreateBlog;