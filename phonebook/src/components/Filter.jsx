const Filter = ({ searchedName, handleChange }) => {
    console.log(searchedName, handleChange)
    return (
        <form>
            <div>
                filter shown with <input
                    value={searchedName}
                    onChange={handleChange}
                />
            </div>
        </form>
    );
};

export default Filter