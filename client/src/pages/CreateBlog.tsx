import { useEffect, useRef, useState } from "react";
import FormInput from "../components/FormInput";
import "../styles/createBlog.css";
import { useSelector } from "react-redux";
import { selectTag, selectUser, useAppDispatch } from "../store/store";
import { createBlog } from "../store/blog/blogThunk";
import { retriveTags } from "../store/tag/tagThunks";
import { useCreateBlogForm } from "../hooks/useCreateBlogForm";

const CreateBlog = () => {

    const dispatch = useAppDispatch();
    const user_id = useSelector(selectUser).id;
    const tags = useSelector(selectTag).tags;

    const { errors, hasErrors, validateForm, displayErrors } = useCreateBlogForm();

    const isButtonPressed = useRef(false);

    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        tags: [] as string[],
        user_id: user_id ?? '',
    });

    useEffect(() => {
        dispatch(retriveTags());
    }, []);

    useEffect(() => {
        isButtonPressed.current && displayErrors({title: inputs.title});
    },[inputs.title]);

    useEffect(() => {
        if(!hasErrors) {
            dispatch(createBlog(inputs));
        }
    }, [hasErrors]);

    const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        validateForm({title: inputs.title});
        displayErrors({title: inputs.title});
        isButtonPressed.current = true;
    }

    return (
        <div className="flex justify-center h-full items-center">
            <div className="flex rounded-md w-3/4 bg-[#ffffff] create-div pl-4 pr-4">
                <form className="grid blog-form align-middle w-full mt-4" onSubmit={(event) => handleSubmit(event)}>

                    <FormInput label="Title for new blog:" value={inputs.title} placeholder="Enter title..."
                        updateValue={(value) => setInputs({ ...inputs, title: value })} errorMessage={errors.title} />

                    <div className="flex flex-col">
                        <label htmlFor="description" className="label regular-font">Description:</label>
                        <textarea name="description" id="description" cols={30} rows={10} className="input-format" placeholder="Enter description..."
                            onChange={(event) => setInputs({ ...inputs, description: event.target.value })} />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="tags-dropdown" className="label regular-font">Select tags:</label>
                        <select name="tag" id="tags-dropdown" className="input-format regular-font" multiple onChange={(event) => setInputs({ ...inputs, tags: [...inputs.tags, event.target.value] })}>
                            {tags.map((tag) => (<option key={tag.tag_id} value={tag.tag_name}>{tag.tag_name}</option>))}
                        </select>
                    </div>

                    <input type="file" className="pt-4 regular-font label w-1/3 flex items-center file-input" multiple />
                    <input type="submit" value="Submit" className="submit-bt-blog flex items-center justify-center regular-font font-semibold rounded-md text-xl border-solid border-black border-2 w-fit h-fit mb-4 cursor-pointer p-1" />

                </form>
            </div>
        </div>
    );
}

export default CreateBlog;