//Bring in models
const User = mongoose.model('User', userSchema);
const Thoughts = mongoose.model('Thoughts', thoughtSchema);
const Reactions = mongoose.model('Friends', reactionSchema);

export { User, Thoughts, Reactions };