import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-[#252f53be] absolute b-0 w-full text-white py-4 mt-8">
          <div className='container mx-auto flex flex-wrap md:flex-nowrap items-center justify-center'>
            
            <div className="container mx-auto text-center">
                <h2 className="text-lg font-semibold">Track My Expenses</h2>
                <p className="text-sm">Your personal finance tracker</p>
                <p className="text-sm">Manage your income and expenses with ease</p>
            </div>
            
            <div className="container mx-auto text-center">
            <p className="text-sm">&copy; 2025 Track My Expenses. All rights reserved.</p>
            <p className="text-sm">Developed by Thabelo Tshishonga</p>
            <p className="text-sm">Contact: Thabelo.Tshishonga@gmail.com</p>
            </div>
            
            <div className='container mx-auto text-center'>
              <p className="text-sm">Follow us on:</p>
              <div className="flex justify-center gap-4 mt-2">
                <a href="https://www.facebook.com/FE.Dev.Thabelo" 
                target="_blank" 
                rel="noopener noreferrer"  
                className='bg-gray-300 h-10 w-10 flex items-center justify-center text-3xl text-[#252f53be] hover:bg-[#616d96be] hover:text-white transition-all duration-300 ease-in text-center rounded-full p-2'
                ><i className="fa fa-facebook" ></i></a>
                <a href="https://x.com/Thabelo_SA" 
                target="_blank" 
                rel="noopener noreferrer" 
                className='bg-gray-300 h-10 w-10 flex items-center justify-center text-3xl text-[#252f53be] hover:bg-[#616d96be] hover:text-white transition-all duration-300 ease-in text-center rounded-full p-2'
                ><i className="fa fa-twitter" ></i></a>
                <a href="https://github.com/thabie05/My_Capstone.git" 
                target="_blank" 
                rel="noopener noreferrer" 
                className='bg-gray-300 h-10 w-10 flex items-center justify-center text-3xl text-[#252f53be] hover:bg-[#616d96be] hover:text-white transition-all duration-300 ease-in text-center rounded-full p-2'
                ><i className="fa fa-github" ></i></a>
              </div>
            </div>
          </div>
        </footer>
    </div>
  )
}

export default Footer
