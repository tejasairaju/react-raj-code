import React from 'react';
import _get from 'lodash/get';
import { useAuth0 } from "../../../react-auth0-spa";


const Header = () => {
    const { logout, user = {} } = useAuth0();
    return (<header className="header">
    <form action="#" className="header__search">
        <button className="search__button">
            <svg width="45" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_265_604)">
                    <path d="M45.2356 41.7768L32.3244 28.8564C34.8697 25.8039 36.4006 21.9028 36.4006 17.6422C36.4006 7.92191 28.4234 0.0184326 18.6109 0.0184326C8.79843 0.0184326 0.802734 7.93113 0.802734 17.6514C0.802734 27.3716 8.77998 35.2751 18.5925 35.2751C22.7609 35.2751 26.5974 33.8457 29.6407 31.4571L42.598 44.4144C43.3542 45.1706 44.4793 45.1706 45.2356 44.4144C45.9918 43.6582 45.9918 42.533 45.2356 41.7768ZM4.58386 17.6514C4.58386 10.0154 10.8734 3.80878 18.5925 3.80878C26.3115 3.80878 32.6011 10.0154 32.6011 17.6514C32.6011 25.2874 26.3115 31.494 18.5925 31.494C10.8734 31.494 4.58386 25.2782 4.58386 17.6514Z" fill="#585E62" />
                </g>
                <defs>
                    <clipPath id="clip0_265_604">
                        <rect width="45" height="45" fill="white" transform="translate(0.802734)" />
                    </clipPath>
                </defs>
            </svg>
        </button>
        <input type="search" className="search__input" required />
    </form>
    <div className="header__options">
        <a href="#" className="header__change-leng">
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_265_587)">
                    <path d="M22.8018 45.6667C35.2282 45.6667 45.3018 35.5931 45.3018 23.1667C45.3018 10.7403 35.2282 0.666687 22.8018 0.666687C10.3753 0.666687 0.301758 10.7403 0.301758 23.1667C0.301758 35.5931 10.3753 45.6667 22.8018 45.6667Z" fill="#F0F0F0" />
                    <path d="M4.95321 9.4682C3.18582 11.7677 1.85313 14.418 1.07715 17.2972H12.7822L4.95321 9.4682Z" fill="#0052B4" />
                    <path d="M44.5272 17.2973C43.7512 14.4181 42.4184 11.7678 40.6511 9.46832L32.8223 17.2973H44.5272Z" fill="#0052B4" />
                    <path d="M1.07715 29.0364C1.85322 31.9155 3.18591 34.5658 4.95321 36.8652L12.782 29.0364H1.07715Z" fill="#0052B4" />
                    <path d="M36.5008 5.31792C34.2013 3.55053 31.5511 2.21785 28.6719 1.44177V13.1468L36.5008 5.31792Z" fill="#0052B4" />
                    <path d="M9.10352 41.0154C11.403 42.7828 14.0533 44.1155 16.9325 44.8916V33.1866L9.10352 41.0154Z" fill="#0052B4" />
                    <path d="M16.9324 1.44177C14.0533 2.21785 11.4029 3.55053 9.10352 5.31784L16.9324 13.1467V1.44177Z" fill="#0052B4" />
                    <path d="M28.6719 44.8916C31.551 44.1155 34.2013 42.7828 36.5007 41.0155L28.6719 33.1866V44.8916Z" fill="#0052B4" />
                    <path d="M32.8223 29.0364L40.6511 36.8653C42.4184 34.5659 43.7512 31.9155 44.5272 29.0364H32.8223Z" fill="#0052B4" />
                    <path d="M45.1113 20.2319H25.7367H25.7366V0.857146C24.7759 0.732078 23.7964 0.666687 22.8018 0.666687C21.8069 0.666687 20.8276 0.732078 19.867 0.857146V20.2318V20.2318H0.492217C0.367148 21.1926 0.301758 22.172 0.301758 23.1667C0.301758 24.1615 0.367148 25.1408 0.492217 26.1014H19.8668H19.8669V45.4762C20.8276 45.6013 21.8069 45.6667 22.8018 45.6667C23.7964 45.6667 24.7759 45.6014 25.7365 45.4762V26.1016V26.1015H45.1113C45.2364 25.1408 45.3018 24.1615 45.3018 23.1667C45.3018 22.172 45.2364 21.1926 45.1113 20.2319Z" fill="#D80027" />
                    <path d="M28.6709 29.0363L38.7112 39.0766C39.173 38.615 39.6135 38.1324 40.0337 37.6321L31.4379 29.0363H28.6709V29.0363Z" fill="#D80027" />
                    <path d="M16.932 29.0364H16.9318L6.8916 39.0766C7.3532 39.5383 7.83581 39.9788 8.33608 40.3991L16.932 31.8031V29.0364Z" fill="#D80027" />
                    <path d="M16.9322 17.2973V17.2971L6.89191 7.25671C6.43014 7.71832 5.98963 8.20092 5.56934 8.7012L14.1653 17.2972H16.9322V17.2973Z" fill="#D80027" />
                    <path d="M28.6709 17.2973L38.7113 7.25682C38.2497 6.79504 37.7671 6.35453 37.2668 5.93433L28.6709 14.5303V17.2973V17.2973Z" fill="#D80027" />
                </g>
                <defs>
                    <clipPath id="clip0_265_587">
                        <rect width="45" height="45" fill="white" transform="translate(0.301758 0.666687)" />
                    </clipPath>
                </defs>
            </svg>
            English
        </a>
        <a href="#" className="header__notification">
            <svg width="47" height="49" viewBox="0 0 47 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_265_618)">
                    <path d="M40.5651 29.0891C39.285 28.3929 37.3557 27.3405 37.3832 26.2234C37.5752 19.0753 35.6459 13.6272 31.8147 10.4862C30.937 9.76574 29.9677 9.17478 28.9254 8.72145C29.6569 7.88764 30.0866 6.87573 30.0866 5.78288C30.0866 2.96573 27.2338 0.666687 23.7227 0.666687C20.2116 0.666687 17.3588 2.96573 17.3588 5.78288C17.3588 6.87573 17.7885 7.88764 18.52 8.72145C17.4777 9.17478 16.5084 9.76574 15.6307 10.4862C11.7995 13.6353 9.87938 19.0753 10.0622 26.2234C10.0897 27.3405 8.16039 28.3929 6.88029 29.0891C5.63677 29.7691 4.08237 30.6191 4.63098 32.0438C5.1796 33.4686 5.99337 33.8005 15.8135 33.8734C16.2616 37.0629 19.4984 40.3334 23.7227 40.3334C27.947 40.3334 31.1747 37.0629 31.6319 33.8734C41.452 33.8005 42.275 33.4686 42.8144 32.0438C43.363 30.6191 41.8178 29.7691 40.5651 29.0891ZM23.7318 3.96954C24.9754 3.96954 25.9812 4.77907 25.9812 5.78288C25.9812 6.77859 24.9754 7.59621 23.7318 7.59621C22.4883 7.59621 21.4825 6.78669 21.4825 5.78288C21.4825 4.78716 22.4883 3.96954 23.7318 3.96954ZM23.7318 37.0305C21.9946 37.0305 20.4127 35.4357 19.9921 33.8976C21.0711 33.8976 26.3926 33.8976 27.4716 33.8976C27.0509 35.4357 25.4691 37.0305 23.7318 37.0305ZM11.4155 30.4976C12.8785 29.4695 14.2317 28.0691 14.1768 26.1586C14.0123 20.0062 15.5758 15.2624 18.5749 12.8014C20.0196 11.6114 21.7568 10.9881 23.7318 10.9395C25.7068 10.9881 27.4441 11.6114 28.8888 12.8014C31.8879 15.2624 33.4423 20.0062 33.2868 26.1586C33.2411 28.0691 34.5852 29.4695 36.0482 30.4976C32.6285 30.5867 14.8352 30.5867 11.4155 30.4976Z" fill="#2088BD" />
                </g>
                <defs>
                    <filter id="filter0_d_265_618" x="0.517578" y="0.666687" width="46.4111" height="47.6667" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset dy="4" />
                        <feGaussianBlur stdDeviation="2" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_265_618" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_265_618" result="shape" />
                    </filter>
                </defs>
            </svg>
            <span className="notification__number">
                3
            </span>
        </a>
        <a href="#" className="header__name-avatar">
            <div className="avatar__info">
                <span className="header__name">
                    {_get(user, 'nickname')}
                </span>
                <span className="header__job-title">
                    Client Admin
                </span>
            </div>
            <img src={_get(user, 'picture')} className="header__avatar" alt="avatar" />
        </a>
        <a onClick={() => logout()} className="header__exit">
            <svg width="53" height="50" viewBox="0 0 53 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M51.8723 26.3064C51.8837 26.2963 51.8837 26.2963 51.8952 26.2862C51.9295 26.2457 51.9637 26.2153 51.9866 26.1748C51.998 26.1647 51.998 26.1546 52.0095 26.1445C52.0323 26.104 52.0666 26.0635 52.0895 26.023C52.0895 26.0129 52.1009 26.0028 52.1009 26.0028C52.1238 25.9623 52.1467 25.9218 52.1695 25.8712C52.1695 25.8611 52.1695 25.8611 52.181 25.851C52.2038 25.8105 52.2152 25.7599 52.2381 25.7093C52.2381 25.6992 52.2381 25.689 52.2495 25.689C52.261 25.6384 52.2838 25.5979 52.2838 25.5473C52.2838 25.5271 52.2838 25.517 52.2953 25.4967C52.3067 25.4563 52.3067 25.4158 52.3181 25.3753C52.3296 25.3146 52.3296 25.2639 52.3296 25.2032C52.3296 25.1425 52.3296 25.0919 52.3181 25.0312C52.3181 24.9907 52.3067 24.9502 52.2953 24.9097C52.2953 24.8895 52.2953 24.8793 52.2838 24.8591C52.2724 24.8085 52.261 24.768 52.2495 24.7174C52.2495 24.7073 52.2495 24.6972 52.2381 24.6972C52.2267 24.6466 52.2038 24.6061 52.181 24.5555C52.181 24.5454 52.181 24.5454 52.1695 24.5352C52.1467 24.4947 52.1238 24.4441 52.1009 24.4037C52.1009 24.3935 52.0895 24.3834 52.0895 24.3834C52.0666 24.3429 52.0438 24.3024 52.0095 24.262C51.998 24.2518 51.998 24.2417 51.9866 24.2316C51.9523 24.1911 51.9295 24.1506 51.8952 24.1203C51.8837 24.1101 51.8837 24.1101 51.8723 24.1C51.8266 24.0595 51.7923 24.0089 51.7351 23.9684L40.4291 13.9688C39.6632 13.2907 38.4171 13.2907 37.6512 13.9688C36.8853 14.6469 36.8853 15.7501 37.6512 16.4282L45.6077 23.4725H13.976C12.89 23.4725 12.0098 24.2518 12.0098 25.2032C12.0098 26.1647 12.89 26.9441 13.976 26.9441H45.6191L37.7198 33.9377C36.9539 34.6159 36.9539 35.7191 37.7198 36.3972C38.097 36.7312 38.6 36.9032 39.103 36.9032C39.606 36.9032 40.109 36.7312 40.4863 36.3972L51.7237 26.4481C51.7808 26.3874 51.8266 26.3469 51.8723 26.3064Z" fill="#2088BD" />
                <path d="M10.9916 3.88823H25.6242C26.7103 3.88823 27.5905 3.1089 27.5905 2.15752C27.5905 1.19601 26.7103 0.416687 25.6242 0.416687H10.9916C5.12711 0.416687 0.348633 4.64731 0.348633 9.83944V40.5772C0.348633 45.7694 5.12711 50 10.9916 50H25.3842C26.4702 50 27.3504 49.2207 27.3504 48.2693C27.3504 47.3078 26.4702 46.5285 25.3842 46.5285H10.9916C7.28771 46.5285 4.26973 43.8565 4.26973 40.5772V9.83944C4.28116 6.55008 7.28771 3.88823 10.9916 3.88823Z" fill="#2088BD" />
            </svg>
        </a>
    </div>
</header>);
}

export default Header;