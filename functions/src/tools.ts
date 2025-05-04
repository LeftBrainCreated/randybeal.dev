import { ChatCompletionTool } from "openai/resources/chat/completions";


export const faithfulGuideTools: ChatCompletionTool[] = [
              {
                type: "function",
                function: {
                  name: "GenerateToken",
                  description: "Get Authentication Token For Faithful Guide APIs",
                  parameters: {
                    type: "object",
                    properties: {},
                    required: []
                  }
                }
              },
              {
                type: "function",
                function: {
                  name: "Create_User",
                  description: "Function to add new user to database for reference and context.",
                  parameters: {
                    type: "object",
                    properties: {
                      token: { type: "string", description: "Token provided from authGpt function" },
                      user: {
                        type: "object",
                        description: "User profile information",
                        properties: {
                          userProfile: {
                            type: "object",
                            properties: {
                              profile: {
                                type: "object",
                                properties: {
                                  personal_details: {
                                    type: "object",
                                    properties: {
                                      preferredName: { type: "string" },
                                      age: { type: "number" },
                                      occupation: { type: "string" }
                                    }
                                  },
                                  immediate_contacts: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        name: { type: "string" },
                                        relationship: { type: "string" },
                                        frequency: { type: "string" }
                                      }
                                    }
                                  },
                                  spiritual_background: {
                                    type: "object",
                                    properties: {
                                      faith_maturity: { type: "string" },
                                      bible_knowledge: { type: "string" },
                                      church_involvement: { type: "string" },
                                      preferred_study_style: { type: "string" }
                                    }
                                  },
                                  goals_and_concerns: {
                                    type: "object",
                                    properties: {
                                      short_term_goals: { type: "array", items: { type: "string" } },
                                      long_term_goals: { type: "array", items: { type: "string" } },
                                      immediate_worries: { type: "array", items: { type: "string" } },
                                      long_term_worries: { type: "array", items: { type: "string" } }
                                    }
                                  },
                                  study_preferences: {
                                    type: "object",
                                    properties: {
                                      session_length: { type: "string", default: "15 minutes" },
                                      preferred_time: { type: "string", default: "15 minutes" },
                                      frequency: { type: "string", default: "daily" }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    required: ["token", "user"]
                  }
                }
              },
              {
                type: "function",
                function: {
                  name: "Get_User_Interactions",
                  description: "Get user interactions from the database.",
                  parameters: {
                    type: "object",
                    properties: {
                      token: { type: "string", description: "Token provided from authGpt function" },
                      userId: { type: "string", description: "User ID" },
                      searchTag: { type: "string", description: "Tag to search for" },
                      fromDate: { type: "string", format: "date-time", description: "Start date for filtering" },
                      toDate: { type: "string", format: "date-time", description: "End date for filtering" }
                    },
                    required: ["token", "userId"]
                  }
                }
              },
              {
                type: "function",
                function: {
                  name: "Add_User_Interaction",
                  description: "Add context for later retrieval.",
                  parameters: {
                    type: "object",
                    properties: {
                      token: { type: "string", description: "Token provided from authGpt function" },
                      userId: { type: "string", description: "The user's unique identifier" },
                      userInteraction: {
                        type: "object",
                        description: "Interaction metadata",
                        properties: {
                          date: { type: "string", format: "date-time", description: "DateTime of interaction" },
                          summary: { type: "string", description: "GPT Defined Summary of interaction." },
                          scriptureFocus: { type: "array", items: { type: "string" } },
                          notes: { type: "string" },
                          tags: { type: "array", items: { type: "string" } }
                        }
                      }
                    },
                    required: ["token", "userId", "userInteraction"]
                  }
                }
              },
              {
                type: "function",
                function: {
                  name: "Get_User_Studies",
                  description: "Get user studies from the database.",
                  parameters: {
                    type: "object",
                    properties: {
                      token: { type: "string", description: "Token provided from authGpt function" },
                      userId: { type: "string", description: "User ID" }
                    },
                    required: ["token", "userId"]
                  }
                }
              },
              {
                type: "function",
                function: {
                  name: "Save_User_Study",
                  description: "Save user study to the database.",
                  parameters: {
                    type: "object",
                    properties: {
                      token: { type: "string", description: "Token provided from authGpt function" },
                      userId: { type: "string", description: "User ID" },
                      studyName: { type: "string", description: "Name of the study" },
                      studyContent: { type: "string", description: "Content of the study" },
                      lockStudy: { type: "boolean", description: "Lock the study" }
                    },
                    required: ["token", "userId", "studyName", "studyContent"]
                  }
                }
              },
              {
                type: "function",
                function: {
                  name: "Lock_User_Study",
                  description: "Lock or unlock a user study.",
                  parameters: {
                    type: "object",
                    properties: {
                      token: { type: "string", description: "Token provided from authGpt function" },
                      userId: { type: "string", description: "User ID" },
                      studyId: { type: "string", description: "Study ID" },
                      lock: { type: "boolean", description: "Lock or unlock the study" }
                    },
                    required: ["token", "userId", "studyId"]
                  }
                }
              },
              {
                type: "function",
                function: {
                  name: "Update_User",
                  description: "Update user profile information.",
                  parameters: {
                    type: "object",
                    properties: {
                      token: { type: "string", description: "Token provided from authGpt function" },
                      userId: { type: "string", description: "User ID" },
                      userProfile: { type: "object", description: "User profile information" }
                    },
                    required: ["token", "userId", "userProfile"]
                  }
                }
              },
              {
                type: "function",
                function: {
                  name: "Get_User_By_Id",
                  description: "Get user by ID.",
                  parameters: {
                    type: "object",
                    properties: {
                      token: { type: "string", description: "Token provided from authGpt function" },
                      userId: { type: "string", description: "User ID" }
                    },
                    required: ["token", "userId"]
                  }
                }
              },
            ]