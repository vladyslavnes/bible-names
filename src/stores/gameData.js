import { writable } from 'svelte/store'
export const players = writable(["John", "Jane", "Jake"]);
export const answerTime = writable(Infinity);

// TODO: Finish listing names
let rawNames = `Adam, Abel, Abraham, Aaron, Solomon, David, Esther, Ruth,
Jesse, Dathan, Nathan, Mathew, Luke, Jesus Christ, Joshua,
Job, Mary Magdalene, Peter, Paul, Jude, Simeon, John Baptist,
Joseph, Boaz, Nebuchadnezzar, Daniel, Isaiah, Thomas, Noah, Eve,
Cain, Moses, Elizabeth, Zechariah, Benjamin, Jonathan, Saul, Samuel,
Ezekiel, Jeremiah, Hezekiah, Nehemiah, Levi, Gideon, Zipporah, Hagar,
Esau, Jacob, Michael, Gabriel, Timothy, Titus, Amos, Habakkuk, Hosea,
Absalom, Joseph from Arimathea, Simon the Cananite, Keren-Happuch,
Keziah, Jemima, Zedekiah, Isaac, Rachel, Deborah, Barnabas`
export const names = writable(rawNames.split(/,\s/));