import React from 'react';

const Footer = () => {
    return (
        <footer className='bg-white text-green-800 py-2 fixed bottom-0 w-full text-xs'>
            <div className='container mx-auto text-center'>
                <p className='mb-1'>
                    &copy; {new Date().getFullYear()} Handmade. All rights reserved.
                </p>
                <div className='flex justify-center space-x-1'>
                    <a href='/about' className='hover:underline'>
                        About Us
                    </a>
                    <a href='/contact' className='hover:underline'>
                        Contact
                    </a>
                    <a href='/privacy' className='hover:underline'>
                        Privacy Policy
                    </a>
                    <a href='/terms' className='hover:underline'>
                        Terms of Service
                    </a>
                </div>
                <div className='mt-1 flex justify-center space-x-2'>
                    <a href='https://www.facebook.com' className='text-green-800 hover:text-green-700'>
                        <i className='fab fa-facebook-f text-sm'></i>
                    </a>
                    <a href='https://www.twitter.com' className='text-green-800 hover:text-green-700'>
                        <i className='fab fa-twitter text-sm'></i>
                    </a>
                    <a href='https://www.instagram.com' className='text-green-800 hover:text-green-700'>
                        <i className='fab fa-instagram text-sm'></i>
                    </a>
                    <a href='https://www.linkedin.com' className='text-green-800 hover:text-green-700'>
                        <i className='fab fa-linkedin-in text-sm'></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
