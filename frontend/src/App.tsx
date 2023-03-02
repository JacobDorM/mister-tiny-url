import { Navigate, Route, Routes } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader'
import { TinyUrlApp } from './pages/TinyUrlApp'
import { TinyUrlChat } from './pages/TinyUrlChat'
import { ChatRoom } from './pages/ChatRoom'
import { Login } from './cmps/auth/Login'
import { Logout } from './cmps/auth/Logout'
import { Register } from './cmps/auth/Register'
import { RoomEdit } from './pages/RoomEdit'
import { ChatUser } from './pages/ChatUser'

export const App: React.FC<{}> = () => {
  return (
    <div>
      <div className="App">
        <AppHeader />
        <main className="container ">
          <Routes>
            <Route path="/chat" element={<TinyUrlChat />} />
            <Route path="/room/edit" element={<RoomEdit />} />
            <Route path="/room/edit/:id" element={<RoomEdit />} />
            <Route path="/room/chat/:id" element={<ChatRoom />} />
            <Route path="/user/chat/:id" element={<ChatUser />} />
            <Route path="/tinyurl/:id" element={<TinyUrlApp />} />
            <Route path="/tinyurl" element={<TinyUrlApp />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="logout" element={<Logout />} />
            </Route>
            <Route path="/" element={<Navigate to="/tinyurl" />} />
          </Routes>
        </main>
      </div>
      <div className="background-img">
        <svg width="576" height="657" viewBox="0 0 576 657" fill="none" xmlns="http://www.w3.org/2000/svg" className="background-img-bottom">
          <path fillRule="evenodd" clipRule="evenodd" d="M119.005 490.408C104.348 426.309 103.735 359.939 126.098 298.105C146.88 240.642 190.23 196.348 238.776 159.237C285.339 123.642 339.92 107.296 396.362 91.4996C468.695 71.2562 553.312 8.95396 613.046 54.4918C674.494 101.336 634.107 201.896 641.998 278.759C647.244 329.854 654.826 377.525 651.472 428.779C647.298 492.553 668.578 571.511 620.111 613.172C571.712 654.774 496.031 604.218 433.356 616.263C356.216 631.089 288.829 720.051 215.905 690.855C145.28 662.579 135.963 564.569 119.005 490.408Z" fill="url(#paint0_linear)" fillOpacity="0.3"></path>{' '}
          <path fillRule="evenodd" clipRule="evenodd" d="M207.243 573.011C186.674 518.997 178.054 461.296 189.988 404.743C201.078 352.187 233.418 308.347 271.157 270.126C307.354 233.466 352.877 212.586 400.086 191.958C460.587 165.523 526.658 100.977 584.206 133.341C643.406 166.634 620.5 259.094 636.735 325.044C647.526 368.884 659.935 409.46 663.26 454.486C667.397 510.511 695.542 576.654 658.427 618.825C621.363 660.938 549.321 626.149 496.228 644.271C430.882 666.576 383.059 752.23 316.019 735.699C251.094 719.689 231.041 635.504 207.243 573.011Z" fill="url(#paint1_linear)" fillOpacity="0.4"></path>{' '}
          <path fillRule="evenodd" clipRule="evenodd" d="M403.49 282.211C453.064 252.494 508.362 233.896 566.131 235.735C619.816 237.444 668.646 261.602 712.889 292.059C755.324 321.272 783.858 362.431 812.44 405.295C849.068 460.228 924.193 513.966 902.414 576.295C880.011 640.412 784.967 634.064 722.882 661.603C681.612 679.91 643.839 699.238 600.092 710.401C545.658 724.291 485.472 763.592 437.449 734.441C389.492 705.33 411.119 628.307 383.973 579.211C350.563 518.785 257.854 486.712 262.381 417.812C266.766 351.086 346.134 316.591 403.49 282.211Z" fill="url(#paint2_linear)" fillOpacity="0.6"></path>{' '}
          <defs>
            <linearGradient id="paint0_linear" x1="693.25" y1="516.469" x2="150.817" y2="495.802" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9EE6F7" stopOpacity="0"></stop> <stop offset="1" stopColor="#9EE6F7" stopOpacity="0.46"></stop>
            </linearGradient>{' '}
            <linearGradient id="paint1_linear" x1="710.313" y1="525.732" x2="235.594" y2="573.831" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9EE6F7" stopOpacity="0"></stop> <stop offset="1" stopColor="#9EE6F7" stopOpacity="0.46"></stop>
            </linearGradient>{' '}
            <linearGradient id="paint2_linear" x1="538.194" y1="769.211" x2="407.651" y2="310.266" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9EE6F7" stopOpacity="0"></stop> <stop offset="1" stopColor="#9EE6F7" stopOpacity="0.46"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}
