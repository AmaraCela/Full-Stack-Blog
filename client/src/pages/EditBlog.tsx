import { useState } from "react";
import FormInput from "../components/FormInput";
import { useSelector } from "react-redux";
import { selectUser } from "../store/store";
import { useCreateBlogForm } from "../hooks/useCreateBlogForm";
import { CreateBlogInputType } from "../types/blogTypes";

const EditBlog = () => {

    const user_id = useSelector(selectUser).id;
    const { errors, hasErrors, validateForm, displayErrors } = useCreateBlogForm();

    const [inputs, setInputs] = useState<CreateBlogInputType>({
        title: '',
        description: '',
        tags: [] as string[],
        user_id: user_id ?? '',
        images: [],
    });


    return (
        <div className="w-full h-full flex justify-center">
            <div className="w-2/4 bg-white h-fit info-box rounded-md p-8">
                <FormInput label="Title for new blog:" value={inputs.title} placeholder="Enter title..."
                    updateValue={(value) => setInputs({ ...inputs, title: value })} errorMessage={errors.title} />

                <div className="flex flex-col">
                    <label htmlFor="description" className="label regular-font">Description:</label>
                    <textarea name="description" id="description" cols={30} rows={10} className="input-format" placeholder="Enter description..."
                        onChange={(event) => setInputs({ ...inputs, description: event.target.value })} />
                </div>
                
            </div>

        </div>
    );
}

export default EditBlog;