import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({ loading }) => {
    return (
        <ClipLoader size={100} color={"#474554"} loading={loading} />
    )
}

export default Loader;