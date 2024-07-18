export const Loader = () => {
    return (
        <div className="d-flex justify-content-center">
            <div
                className="spinner-border text-warning mt-5 me-4"
                role="status"
                style={{ width: "8rem", height: "8rem" }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};
