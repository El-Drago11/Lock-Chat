import {BlogsList} from "@/lib/Blogs"

const Assignment = async() => {

  return (
    <>
      <div className="space-y-10 p-4">
        {
          (BlogsList && BlogsList?.length)?BlogsList?.map((curr,index)=>(
              <div key={index} className="space-y-4 text-2xl border-1 p-4 rounded-lg">
                    <div className="flex gap-x-2 font-bold">
                      <span className="text-nowrap">Question : </span>
                      <span>{curr?.question}</span>
                    </div>
                    <div className="flex gap-x-2 font-semibold">
                      <span  className="text-nowrap">Answer : </span>
                      <span>{curr?.answer}</span>
                    </div>
              </div>
          ))
          :<div className="text-muted text-2xl text-center h-full w-full">No Blog Data Available</div>
        }
      </div>
    </>
  )
}

export default Assignment;
