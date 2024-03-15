import { useEffect, useRef, useState } from "react";
import FormInput from "../components/FormInput";
import { useSelector } from "react-redux";
import { selectBlog, selectTag, useAppDispatch } from "../store/store";
import { retriveTags } from "../store/tag/tagThunks";
import { useNavigate, useParams } from "react-router-dom";
import { getIndividualBlog, updateBlog } from "../store/blog/blogThunk";
import FormButton from "../components/FormButton";
import { useEditBlogForm } from "../hooks/useEditBlogForm";

const EditBlog = () => {

    const { errors, hasErrors, validateForm, displayErrors } = useEditBlogForm();
    const tags = useSelector(selectTag).tags;
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const blog = useSelector(selectBlog).blog;
    const isButtonPressed = useRef(false);
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        post_id: id ?? '',
        title: blog[0].title,
        description: blog[0].description,
        tags: blog[0].tags.map((item) => item.tag_id),
    });

    useEffect(() => {
        tags.length === 0 && dispatch(retriveTags());
        dispatch(getIndividualBlog(id ?? ''));
    }, []);

    useEffect(() => {
        isButtonPressed.current && displayErrors(inputs);
    }, [inputs])


    useEffect(() => {
        if (!hasErrors) {
            dispatch(updateBlog(inputs));
            navigate(`../blogs/${id}`);

        }
    }, [hasErrors])


    const handleSave = () => {
        validateForm(inputs);
        displayErrors(inputs);
        isButtonPressed.current = true;
    }

    return (
        <div className="w-full h-full flex justify-center">
            <div className="w-2/4 bg-white h-fit info-box rounded-md p-8">
                <FormInput label="Title for new blog:" value={inputs.title} placeholder="Enter title..."
                    updateValue={(value) => setInputs({ ...inputs, title: value })} errorMessage={errors.title} />

                <div className="flex flex-col">
                    <label htmlFor="description" className="label regular-font">Description:</label>
                    <textarea name="description" value={inputs.description} id="description" cols={30} rows={10} className="input-format" placeholder="Enter description..."
                        onChange={(event) => setInputs({ ...inputs, description: event.target.value })} />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="tags-dropdown" className="label regular-font">Select tags:</label>
                    <select name="tag" id="tags-dropdown" className="input-format regular-font" value={inputs.tags} multiple required onChange={(event) => {
                        const selectedOptions = Array.from(event.target.selectedOptions, option => String(option.value));
                        setInputs({ ...inputs, tags: selectedOptions })
                    }}>
                        {tags.map((tag) => (<option key={tag.tag_id} value={tag.tag_id}>{tag.tag_name}</option>))}
                    </select>
                    <p className={`text-xs text-red-700 italic font-bold ${errors.tags ? "block" : "hidden"}`}>{errors.tags}</p>
                </div>

                <div className="mt-4">
                    <FormButton value={"Save"} handle={() => handleSave()} />
                </div>

            </div>

        </div>
    );
}

export default EditBlog;