import { useEffect, useRef, useState } from "react";
import FormInput from "../components/FormInput";
import "../styles/createBlog.css";
import { useSelector } from "react-redux";
import { selectBlog, selectTag, selectUser, useAppDispatch } from "../store/store";
import { createBlog } from "../store/blog/blogThunk";
import { retriveTags } from "../store/tag/tagThunks";
import { useCreateBlogForm } from "../hooks/useCreateBlogForm";
import { useNavigate } from "react-router-dom";
import { CreateBlogInputType } from "../types/blogTypes";

const CreateBlog = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user_id = useSelector(selectUser).id;
    const tags = useSelector(selectTag).tags;
    const successful = useSelector(selectBlog).successful;
    const error = useSelector(selectBlog).error;

    const { errors, hasErrors, validateForm, displayErrors } = useCreateBlogForm();

    const isButtonPressed = useRef(false);

    const [inputs, setInputs] = useState<CreateBlogInputType>({
        title: '',
        description: '',
        tags: [] as string[],
        user_id: user_id ?? '',
        images: [],
    });

    useEffect(() => {
        dispatch(retriveTags());
    }, []);

    useEffect(() => {
        isButtonPressed.current && displayErrors({ title: inputs.title, tags: inputs.tags, images: inputs.images });
    }, [inputs.title]);

    useEffect(() => {
        if (!hasErrors) {
            const formData = new FormData();
            formData.append('title', inputs.title);
            formData.append('description', inputs.description);
            formData.append('user_id', inputs.user_id);
            for (let element of inputs.tags) {
                formData.append('tags', element);
            }
            for (let i = 0; i < inputs.images.length; i++) {
                formData.append('files', inputs.images[i]);
            }
            dispatch(createBlog(formData));
        }
    }, [hasErrors]);

    useEffect(() => {
        successful && navigate("/");
    }, [successful])


    const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        validateForm({ title: inputs.title, tags: inputs.tags, images: inputs.images });
        displayErrors({ title: inputs.title, tags: inputs.tags, images: inputs.images });
        isButtonPressed.current = true;
    }

    const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({ ...inputs, images: event.target.files ?? [] })
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
                        <select name="tag" id="tags-dropdown" className="input-format regular-font" multiple required onChange={(event) => {
                            const selectedOptions = Array.from(event.target.selectedOptions, option => String(option.value));
                            setInputs({ ...inputs, tags: selectedOptions })
                        }}>
                            {tags.map((tag) => (<option key={tag.tag_id} value={tag.tag_id}>{tag.tag_name}</option>))}
                        </select>
                        <p className={`text-xs text-red-700 italic font-bold ${errors.tags ? "block" : "hidden"}`}>{errors.tags}</p>
                    </div>

                    <div className="flex flex-col">
                        <input type="file" className="pt-4 regular-font label w-1/3 flex items-center file-input" multiple required onChange={handleFiles} />
                        <p className={`text-xs text-red-700 italic font-bold ${errors.images ? "block" : "hidden"}`}>{errors.images}</p>
                    </div>
                    <input type="submit" value="Submit" className="submit-bt-blog flex items-center justify-center regular-font font-semibold rounded-md text-xl border-solid border-black border-2 w-fit h-fit mb-4 cursor-pointer p-1" />

                </form>
            </div>
        </div>
    );
}

export default CreateBlog;