export interface IBlogs{
    assignmentNo:string,
    question:string,
    answer:string,
}

export const BlogsList:IBlogs[]=[
    {
        assignmentNo:'1',
        question:'Explain Chat GPT to five year old?',
        answer:"Chat GPT is a gini which give solution to the problems.It will always give solution which according to him is accurate, so don't blindliy trust the solution provided by it you may consider its suggestion while making any decision. The GPT doesn'yt have any emotions or feeling so it doesn't consider if you feel bad or good about the answers it gives."
    },
    {
        assignmentNo:'1',
        question:'Explain vector embedding to your mom?',
        answer:"Vector embedding is a method to place something in a ceratin position such that the things around it are related to it most in order of the distance from that certain thing. For example: Like we organize the kitchen our kitchen in such a way that if we want to look a ceratin thing we will know around which area it will be , we might not know the exact postion but we will know where to search for first instead of whole kitchen one by one"
    },
    {
        assignmentNo:'1',
        question:"Explain tokenization to a fresher?",
        answer:"Tokenization is a process where we genrate the token for each input such that we have a unique key in an encrypted form for each input given by user and these token are genarted such that when we access these token to dycrypt such token the decrypter must have access to a unique formula and decrypt that token and this token can contain any information about the user or user input",
    }
]