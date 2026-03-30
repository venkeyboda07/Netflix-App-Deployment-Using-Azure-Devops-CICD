import { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Player from "video.js/dist/types/player";
import { Box, Stack, Typography } from "@mui/material";
import { SliderUnstyledOwnProps } from "@mui/base/SliderUnstyled";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import SettingsIcon from "@mui/icons-material/Settings";
import BrandingWatermarkOutlinedIcon from "@mui/icons-material/BrandingWatermarkOutlined";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import useWindowSize from "src/hooks/useWindowSize";
import { formatTime } from "src/utils/common";

import MaxLineTypography from "src/components/MaxLineTypography";
import VolumeControllers from "src/components/watch/VolumeControllers";
import VideoJSPlayer from "src/components/watch/VideoJSPlayer";
import PlayerSeekbar from "src/components/watch/PlayerSeekbar";
import PlayerControlButton from "src/components/watch/PlayerControlButton";

export function Component() {
  const playerRef = useRef<Player | null>(null);

  const [playerState, setPlayerState] = useState({
    paused: false,
    muted: false,
    playedSeconds: 0,
    duration: 0,
    volume: 0.8,
    loaded: 0,
  });

  const navigate = useNavigate();
  const [playerInitialized, setPlayerInitialized] = useState(false);

  const windowSize = useWindowSize();

  const videoJsOptions = useMemo(() => {
    return {
      preload: "metadata",
      autoplay: true,
      controls: false,
      width: windowSize.width,
      height: windowSize.height,
      sources: [
        {
          src: "https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
          type: "application/x-mpegurl",
        },
      ],
    };
  }, [windowSize]);

  const handlePlayerReady = (player: Player): void => {
    player.on("pause", () => {
      setPlayerState((draft) => ({
        ...draft,
        paused: true,
      }));
    });

    player.on("play", () => {
      setPlayerState((draft) => ({
        ...draft,
        paused: false,
      }));
    });

    player.on("timeupdate", () => {
      setPlayerState((draft) => ({
        ...draft,
        playedSeconds: player.currentTime(),
      }));
    });

    player.one("durationchange", () => {
      setPlayerInitialized(true);
      setPlayerState((draft) => ({
        ...draft,
        duration: player.duration(),
      }));
    });

    playerRef.current = player;

    setPlayerState((draft) => ({
      ...draft,
      paused: player.paused(),
    }));
  };

  // ✅ FIXED: Properly typed parameters (no implicit any)
  const handleVolumeChange: SliderUnstyledOwnProps["onChange"] = (
    _: Event,
    value: number | number[]
  ) => {
    if (typeof value !== "number") return;

    const volume = value / 100;

    playerRef.current?.volume(volume);

    setPlayerState((draft) => ({
      ...draft,
      volume,
    }));
  };

  const handleSeekTo = (v: number) => {
    playerRef.current?.currentTime(v);
  };

  const handleGoBack = () => {
    navigate("/browse");
  };

  if (!videoJsOptions.width) return null;

  return (
    <Box sx={{ position: "relative" }}>
      <VideoJSPlayer options={videoJsOptions} onReady={handlePlayerReady} />

      {playerRef.current && playerInitialized && (
        <Box
          sx={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: "absolute",
          }}
        >
          <Box px={2} sx={{ position: "absolute", top: 75 }}>
            <PlayerControlButton onClick={handleGoBack}>
              <KeyboardBackspaceIcon />
            </PlayerControlButton>
          </Box>

          <Box
            px={2}
            sx={{
              position: "absolute",
              top: { xs: "40%", sm: "55%", md: "60%" },
              left: 0,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "white",
              }}
            >
              Title
            </Typography>
          </Box>

          <Box
            px={{ xs: 0, sm: 1, md: 2 }}
            sx={{
              position: "absolute",
              top: { xs: "50%", sm: "60%", md: "70%" },
              right: 0,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                px: 1,
                py: 0.5,
                fontWeight: 700,
                color: "white",
                bgcolor: "red",
                borderRadius: "12px 0px 0px 12px",
              }}
            >
              12+
            </Typography>
          </Box>

          <Box
            px={{ xs: 1, sm: 2 }}
            sx={{
              position: "absolute",
              bottom: 20,
              left: 0,
              right: 0,
            }}
          >
            {/* Seekbar */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <PlayerSeekbar
                playedSeconds={playerState.playedSeconds}
                duration={playerState.duration}
                seekTo={handleSeekTo}
              />
            </Stack>

            {/* Controls */}
            <Stack direction="row" alignItems="center">
              <Stack
                direction="row"
                spacing={{ xs: 0.5, sm: 1.5, md: 2 }}
                alignItems="center"
              >
                {!playerState.paused ? (
                  <PlayerControlButton
                    onClick={() => playerRef.current?.pause()}
                  >
                    <PauseIcon />
                  </PlayerControlButton>
                ) : (
                  <PlayerControlButton
                    onClick={() => playerRef.current?.play()}
                  >
                    <PlayArrowIcon />
                  </PlayerControlButton>
                )}

                <PlayerControlButton>
                  <SkipNextIcon />
                </PlayerControlButton>

                <VolumeControllers
                  muted={playerState.muted}
                  handleVolumeToggle={() => {
                    playerRef.current?.muted(!playerState.muted);
                    setPlayerState((draft) => ({
                      ...draft,
                      muted: !draft.muted,
                    }));
                  }}
                  value={playerState.volume}
                  handleVolume={handleVolumeChange}
                />

                <Typography variant="caption" sx={{ color: "white" }}>
                  {`${formatTime(
                    playerState.playedSeconds
                  )} / ${formatTime(playerState.duration)}`}
                </Typography>
              </Stack>

              <Box flexGrow={1}>
                <MaxLineTypography
                  maxLine={1}
                  variant="subtitle1"
                  textAlign="center"
                  sx={{ maxWidth: 300, mx: "auto", color: "white" }}
                >
                  Description
                </MaxLineTypography>
              </Box>

              <Stack
                direction="row"
                alignItems="center"
                spacing={{ xs: 0.5, sm: 1.5, md: 2 }}
              >
                <PlayerControlButton>
                  <SettingsIcon />
                </PlayerControlButton>
                <PlayerControlButton>
                  <BrandingWatermarkOutlinedIcon />
                </PlayerControlButton>
                <PlayerControlButton>
                  <FullscreenIcon />
                </PlayerControlButton>
              </Stack>
            </Stack>
          </Box>
        </Box>
      )}
    </Box>
  );
}

Component.displayName = "WatchPage";
