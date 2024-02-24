import { useState } from "react";
import FormInput from "../components/FormInput";
import "../styles/createBlog.css";
import { useTitleValidation } from "../hooks/useTitleValidation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { createBlog } from "../store/blog/blogThunk";

const CreateBlog = () => {

    const dispatch = useDispatch<AppDispatch>();
    const user_id = useSelector((state: RootState) => state.user.id);

    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        tags: [] as string[],
        user_id: user_id ?? '',
    });

    const [errors, setErrors] = useState({
        title: ''
    });

    const titleError = useTitleValidation(inputs.title);

    const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        if (!errors.title) {
            dispatch(createBlog(inputs));
        }
    }

    return (
        <div className="flex justify-center h-full items-center">
            <div className="flex rounded-md w-3/4 bg-[#ffffff] create-div pl-4 pr-4">
                <form className="grid blog-form align-middle w-full mt-4" onSubmit={(event) => handleSubmit(event)}>

                    <FormInput label="Title for new blog:" value={inputs.title} placeholder="Enter title..."
                        updateValue={(value) => setInputs({ ...inputs, title: value })} errorMessage={errors.title} />

                    <label htmlFor="description" className="label regular-font">Description:</label>
                    <textarea name="description" id="description" cols={30} rows={10} className="input-format" placeholder="Enter description..."
                        onChange={(event) => setInputs({ ...inputs, description: event.target.value })} />

                    <label htmlFor="tags-dropdown" className="label regular-font">Select tags:</label>
                    <select name="tag" id="tags-dropdown" className="input-format regular-font" multiple onChange={(event) => setInputs({ ...inputs, tags: [...inputs.tags, event.target.value] })}>
                        <option value="tag1">tag1</option>
                        <option value="tag2">tag2</option>
                    </select>

                    <input type="file" className="pt-4 regular-font label w-1/3 flex items-center file-input" multiple />
                    <input type="submit" value="Submit" className="submit-bt-blog flex items-center justify-center regular-font font-semibold rounded-md text-xl border-solid border-black border-2 w-fit h-fit mb-4 cursor-pointer p-1" />

                </form>
            </div>
        </div>
    );
}

export default CreateBlog;