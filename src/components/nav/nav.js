import './style.scss';

export default function Nav() {
  return <aside>
    <div className='green'>
    </div>
    <div className='greenWrap'>
      <svg width="129" height="158" viewBox="0 0 129 158" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_0_1)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M125 3H100H0V103V153C0 125.386 22.3858 103 50 103H70C86.5685 103 100 89.5685 100 73V28C100 14.1929 111.193 3 125 3Z" fill="#85D288" />
        </g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M25 3H0V28C0 14.1929 11.1929 3 25 3Z" fill="#98DD9B" />
        <defs>
          <filter id="filter0_d_0_1" x="-4" y="0" width="133" height="158" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
          </filter>
        </defs>
      </svg>

    </div>
    <div className="whitespace">
    </div>
  </aside >
}