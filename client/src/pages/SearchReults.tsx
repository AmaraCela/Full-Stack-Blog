import { useState } from "react";
import SearchBlogDisplay from "../components/SearchBlogDisplay";

const SearchResult = () => {
    const [keyword, setKeyword] = useState('a');
    return (
        <div>
            <h1>Showing results for "{keyword}" </h1>
            <SearchBlogDisplay post_id={""} user_id={""} username={""} title={""} description={""} date_posted={""} tags={[]} images={[]} />
        </div>
    );
}

export default SearchResult;