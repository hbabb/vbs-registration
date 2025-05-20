export function Footer() {
    return (
        <footer className="flex h-16 w-full flex-col items-center justify-center bg-gray-800 text-white">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} Motlow Creek Baptist Church. All rights reserved.
            </p>
            <p className="ml-4 text-sm">
                Website development performed by{' '}
                <a href="https://github.com/hbabb" target="_blank" rel="noopener noreferrer">
                    <span className="text-blue-400 hover:underline">Heath Babb</span>
                </a>
            </p>
        </footer>
    );
}
