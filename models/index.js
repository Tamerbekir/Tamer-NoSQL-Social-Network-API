const User = mongoose.model('User', userSchema);
const Thoughts = mongoose.model('Thoughts', thoughtSchema);

export { User, Thoughts };