<template>
  <div class="article">
    <svg width="100%" height="100%">
      <rect x="-10" y="-10" width="300" height="100" style="fill:pink;"/>

      <circle cx="150" cy="100" r="80" fill="green" fill-opacity="0.5"/>

      <text x="150" y="115" font-size="16" text-anchor="middle" fill="white">RUNOOB SVG TEST</text>
      <rect x="330" y="20" width="150" height="150"
            style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.5"/>
      <rect x="50" y="200" rx="30" ry="30" width="150" height="150"
            style="fill:red;stroke:black;stroke-width:5;opacity:0.5"/>
      <circle cx="100" cy="450" r="60" stroke="black" stroke-width="2" fill="red"/>
      <ellipse cx="120" cy="600" rx="100" ry="50" style="fill:yellow;stroke:purple;stroke-width:2"/>

      <ellipse cx="740" cy="110" rx="220" ry="40" style="fill:purple"/>
      <ellipse cx="720" cy="70" rx="190" ry="20" style="fill:lime"/>
      <ellipse cx="710" cy="45" rx="170" ry="15" style="fill:yellow"/>

      <ellipse cx="740" cy="250" rx="220" ry="30" style="fill:yellow"/>
      <ellipse cx="720" cy="250" rx="190" ry="20" style="fill:white"/>

      <line x1="200" y1="200" x2="400" y2="300" style="stroke:rgb(255,0,0);stroke-width:2"/>
      <polygon points="300,300 450,490 300,500" style="fill:lime;stroke:purple;stroke-width:1"/>
      <polygon points="220,10 300,210 170,250 123,234" style="fill:lime;stroke:purple;stroke-width:1"/>

      <polygon points="400,510 340,698 490,578 310,578 460,698"
               style="fill:lime;stroke:purple;stroke-width:5;fill-rule:nonzero;"/>
      <polygon points="700,410 640,598 790,478 610,478 760,598"
               style="fill:lime;stroke:purple;stroke-width:5;fill-rule:evenodd;"/>
      <polyline points="420,320 440,325 460,340 480,420 520,440 600,480"
                style="fill:none;stroke:black;stroke-width:3"/>
      <polyline points="0,40 40,40 40,80 80,80 80,120 120,120 120,160" style="fill:white;stroke:red;stroke-width:4"/>
      <path d="M150 0 L75 200 L225 200 Z"/>
      <text x="700" y="315" fill="red">I love SVG</text>
      <text x="700" y="345" fill="red" transform="rotate(10 80,90)">I love SVG</text>
      <defs>
        <path id="path1" d="M750,120 a1,1 0 0,0 100,0"/>
      </defs>
      <text x="0" y="100" style="fill:red;">
        <textPath xlink:href="#path1">I love SVG I love SVG</textPath>
      </text>
      <text x="900" y="20" style="fill:red;">Several lines:
        <tspan x="910" y="45">First line</tspan>
        <tspan x="910" y="70">Second line</tspan>
      </text>
      <a xlink:href="http://www.w3schools.com/svg/" target="_blank">
        <text x="0" y="15" fill="red">I love SVG</text>
      </a>
      <g fill="none">
        <path stroke="red" d="M900 320 l215 0" />
        <path stroke="blue" d="M900 340 l215 0" />
        <path stroke="black" d="M900 360 l215 0" />
      </g>
      <g fill="none" stroke="black">
        <path stroke-width="2" d="M900 420 l215 0" />
        <path stroke-width="4" d="M900 440 l215 0" />
        <path stroke-width="6" d="M900 460 l215 0" />
      </g>
      <g fill="none" stroke="black" stroke-width="6">
        <path stroke-linecap="butt" d="M900 520 l215 0" />
        <path stroke-linecap="round" d="M900 540 l215 0" />
        <path stroke-linecap="square" d="M900 560 l215 0" />
      </g>
      <g fill="none" stroke="black" stroke-width="4">
        <path stroke-dasharray="5,5" d="M900 620 l215 0" />
        <path stroke-dasharray="10,10" d="M900 640 l215 0" />
        <path stroke-dasharray="20,10,5,5,5,10" d="M900 660 l215 0" />
      </g>
    </svg>
  </div>
</template>

<script>
  export default {
    name: "SVG-1"
  }
</script>

<style scoped>
  .article {
    flex-grow: 1;
  }
</style>
