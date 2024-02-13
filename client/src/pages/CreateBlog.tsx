import "../styles/createBlog.css";
const CreateBlog = () => {
    return ( 
        <div className="flex justify-center h-full items-center">
            <div className="flex rounded-md w-3/4 bg-[#ffffff] create-div pl-4 pr-4">
            <form className="grid blog-form align-middle w-full">
                <label htmlFor="title" className="label regular-font">Title for new blog:</label>
                <input type="text" id="title" className="input-format" />
                <label htmlFor="description" className="label regular-font">Description:</label>
                <textarea name="description" id="description" cols={30} rows={10} className="input-format"></textarea>
                <label htmlFor="tags-dropdown" className="label regular-font">Select tags:</label>
                <select name="tag" id="tags-dropdown" className="input-format regular-font" multiple>
                    <option value="tag1">tag1</option>
                    <option value="tag2">tag2</option>
                </select>
                <input type="file" className="pt-4 regular-font label w-1/3 flex items-center file-input" multiple/>
                <input type="submit" value="Submit" className="submit-bt-blog flex items-center justify-center regular-font font-semibold rounded-md text-xl border-solid border-black border-2 w-fit h-fit mb-4 cursor-pointer p-1"/>
            </form>
            </div>
        </div>
     );
}
 
export default CreateBlog;