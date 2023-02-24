<template>
  <a-card style="width: 500px">
    <p>{{ content }}</p>
  </a-card>

  <a-form
    :model="formState"
    name="basic"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item name="prompt">
      <a-input-group compact>
        <a-textarea
          v-model:value="formState.prompt"
          placeholder="Basic usage"
          :rows="4"
        />
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-input-group>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { getChatGPTResponse } from "../utils/index.js";

const content = ref<string>("请在文本框中输入内容，复杂问题可能等待时间较长");
const prompt = ref<string>("");

interface FormState {
  prompt: string;
}

const formState = reactive<FormState>({
  prompt: "",
});

const onFinish = (values: any) => {
  console.log("Success:", values);
  const { prompt } = values;
  if (prompt.trim()) {
    response(prompt);
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const response = async (prompt) => {
  const res = await getChatGPTResponse(prompt);
  const str = res.split("\n\n");
  console.log("str", str);

  content.value = res;
};

// response();
</script>