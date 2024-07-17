export const Loader = () => {
    return (
        <div className="cover-loading">
            <div
                className="spinner-border text-primary mt-5 me-4"
                role="status"
                style={{ width: "8rem", height: "8rem" }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
            <img src='/logo-meg.png' className="mt-5" alt="Logo" />
        </div>
    );
};
