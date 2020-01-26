import React, { useState, useContext, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { Card, Input } from "react-native-elements";
import { Context as CommentsContext } from "../context/CommentContext";
import { FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const CommentScreen = ({ navigation }) => {
  const { state, createComment, fetchComments } = useContext(CommentsContext);
  const [addedComment, setAddedComment] = useState("");
  console.log("comments screen run");

  const blogId = navigation.getParam("blogId");
  useEffect(() => {
    console.log("useEffect in CommentScreen running");
    fetchComments(blogId);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={state}
        keyExtractor={comment => comment._id}
        renderItem={({ item }) => {
          return (
            <Card>
              <Text style={styles.commentStyle}>{item.content}</Text>
            </Card>
          );
        }}
      ></FlatList>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignSelf: "center",
          alignItems: "center",
          width: "95%"
        }}
      >
        <Input
          multiline
          value={addedComment}
          onChangeText={text => setAddedComment(text)}
          inputContainerStyle={styles.commentInputContainerStyle}
          placeholder=" コメント"
          leftIcon={{ type: "feather", name: "message-square" }}
        />
        <TouchableOpacity
          onPress={() => {
            createComment(addedComment, blogId);
          }}
        >
          <Feather
            style={{
              color: "black"
            }}
            size={30}
            name={"send"}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  commentStyle: {
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10
  },
  commentInputContainerStyle: {
    marginTop: 10,
    marginBottom: 10
  }
});
export default CommentScreen;
