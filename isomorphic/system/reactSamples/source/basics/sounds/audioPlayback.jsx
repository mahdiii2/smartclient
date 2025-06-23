/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HLayout, IButton, Progressbar, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onPlayClick = function () {
    audio.play();
};
let onPauseClick = function () {
    audio.pause();
};
let onResetClick = function () {
    audio.pause();
    audio.reset();
};

var audioIsSupported = isc.Sound.isSupported(), audio = null;

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack defaultLayoutAlign="center" layoutMargin="20" membersMargin="10" width="430" isGroup="true" groupTitle="Audio Playback">
        <members>
            <Progressbar breadth="20" title="00:00 / 00:00" showTitle="true" ID="progressbar"/>
            <HLayout membersMargin="10" ID="hLayout" width="320" height="1" disabled={!audioIsSupported} autoDraw="false">
                <members>
                    <IButton title="Play" click={onPlayClick}/>
                    <IButton title="Pause" click={onPauseClick}/>
                    <IButton title="Reset" click={onResetClick}/>
                </members>
            </HLayout>
        </members>
    </VStack>,
    document.getElementById(target)
);

if (audioIsSupported) {
    audio = isc.Sound.create({
        src: isc.Page.getIsomorphicDocsDir() + 'inlineExamples/audios/crescendo.mp3',
        autoLoad: true,
        duration: '00:00',
        formatTime: function (seconds) {
            if (seconds == null)
                return '--:--';
            var minutes = Math.floor(seconds / 60) || 0;
            minutes = minutes >= 10 ? minutes : '0' + minutes;
            var seconds = Math.floor(seconds % 60) || 0;
            seconds = seconds >= 10 ? seconds : '0' + seconds;
            return minutes + ':' + seconds;
        },
        timeChanged: function (currentTime) {
            progressbar.setPercentDone(Math.floor(currentTime * 100 / this.getDuration()));
            progressbar.setTitle(this.formatTime(currentTime) + ' / ' + this.formatTime(this.getDuration()));
        }
    });
} else {
    isc.warn('Your browser does not support HTML5 Audio');
}
