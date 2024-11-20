import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (

        <header className="bg-gray-800 p-4">
            <nav>
                <ul className="flex justify-center space-x-8">
                    <li>
                        <Link
                            to="/"
                            className="text-white text-lg hover:text-gray-400 transition duration-300"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/add-product"
                            className="text-white text-lg hover:text-gray-400 transition duration-300"
                        >
                            Add Product
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/product-list"
                            className="text-white text-lg hover:text-gray-400 transition duration-300"
                        >
                            Product Page
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/drag-and-drop"
                            className="text-white text-lg hover:text-gray-400 transition duration-300"
                        >
                            Drag and Drop
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>


    )
}

export default Header