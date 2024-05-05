const Filter = ({ searchedCountry, handleChange }) => {
    console.log(searchedCountry, handleChange)
    return (
        <form>
            <div>
                find countries <input
                    value={searchedCountry}
                    onChange={handleChange}
                />
            </div>
        </form>
    );
};

export default Filter