const hasPlayerAlreadyScored = (user, modeConfig) => !user.exists || user.data().time_seconds < modeConfig.remaining;

export default hasPlayerAlreadyScored;