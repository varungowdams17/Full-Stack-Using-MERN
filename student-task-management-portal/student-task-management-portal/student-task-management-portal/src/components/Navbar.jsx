function Navbar() {
    return (
        <nav>
            <h2>Student task portal</h2>
            <div className="nav-links">
                <a href="/dashboard">dashboard</a>
                <a href="/tasks">tasks</a>
            </div>
        </nav>
    );
}
export default Navbar;