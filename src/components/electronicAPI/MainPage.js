import React from 'react';

function TestPage(){
    return(
        <section >            
            <div className='main-page'>
                <h1>A short introduction to VFD displays</h1>
                <img className='clock-img' src='./images/clocks/DSC_1584.jpg' alt='clock'></img>
                <p>A vacuum fluorescent display (VFD) is a display device once commonly used on consumer
                    electronics equipment such as video cassette recorders, car radios, and microwave ovens.
                    LCDs, OLED displays and LED segment displays have now largely replaced VFDs.
                    A VFD operates on the principle of cathodoluminescence, roughly similar to a cathode ray tube,
                    but operating at much lower voltages. Each tube in a VFD has a phosphor coated anode that is
                    bombarded by electrons emitted from the cathode filament. In fact, each tube in a VFD is a
                    triode vacuum tube because it also has a mesh control grid. Unlike liquid crystal displays, a
                    VFD emits a very bright light with high contrast and can support display elements of various
                    colors. Standard illumination figures for VFDs are around 640 cd/m2 with high-brightness VFDs
                    operating at 4,000 cd/m2, and experimental units as high as 35,000 cd/m2 depending on the drive
                    voltage and its timing. The choice of color (which determines the nature of the phosphor)
                    and display brightness significantly affect the lifetime of the tubes, which can range from as
                    low as 1,500 hours for a vivid red VFD to 30,000 hours for the more common green ones. Cadmium
                    was commonly used in VFDs in the past, but the current RoHS-compliant VFDs have eliminated this
                    metal from their construction. VFDs can display seven-segment numerals, multi-segment alpha-numeric
                    characters or can be made in a dot-matrix to display different alphanumeric characters and symbols.
                    In practice, there is little limit to the shape of the image that can be displayed: it depends solely
                    on the shape of phosphor on the anode(s). The first VFD was the single indication DM160 by Philips in
                    1959. The first multi-segment VFD was a 1967 Japanese single-digit, seven-segment device. The displays
                    became common on calculators and other consumer electronics devices. In the late 1980s hundreds of
                    millions of units were made yearly.
                    Of the three prevalent display technologies – VFD, LCD, and LED – the VFD was the first to be developed.
                    It was used in early handheld calculators. LED displays displaced VFDs in this use as the very small LEDs
                    used required less power, thereby extending battery life, though early LED displays had problems achieving
                    uniform brightness levels across all display segments. Later, LCDs displaced LEDs, offering even lower power
                    requirements. The first VFD was the single indication DM160 by Philips in 1959. It could easily be driven by
                    transistors, so was aimed at computer applications as it was easier to drive than a neon and had longer life
                    than a light bulb. This was made obsolete by LEDs. The 1967 Japanese single digit seven segment display in
                    terms of anode was more like the Philips DM70 / DM71 Magic Eye as the DM160 has a spiral wire anode.
                    The Japanese seven segment VFD meant that no patent royalties needed to be paid on desk calculator displays
                    as would have been the case using Nixies or Panaplex neon digits. In the UK the Philips designs were made and
                    marketed by Mullard (almost wholly owned by Philips even before WWII). The Russian IV-15 VFD tube is very
                    similar to the DM160. The DM160, DM70/DM71 and Russian IV-15 can (like a VFD panel) be used as triodes.
                    The DM160 is thus the smallest VFD and smallest triode valve.
                    </p>

            </div>
        </section>
    )
}

export default TestPage;